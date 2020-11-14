package main

import (
	"math"
	"net/http"
	"os"

	"github.com/labstack/echo"

	"github.com/edm20627/go_react_shuffle/model"
)

const defaultPort = "8080"

func port() string {
	p := os.Getenv("PORT")
	if p != "" {
		return ":" + p
	}
	return ":" + defaultPort
}

func main() {
	e := echo.New()
	// http://localhost:8080/api/v1/simulateCombinations?participant=9&groupNumver=3&repeatCnt=3&trial=10&names=aa,bb,cc,dd,ee,ff,gg,hh,ii
	// e.GET("/api/v1/simulateCombinations", Simulate)
	e.GET("/simulate", Simulate)

	e.Logger.Fatal(e.Start(port()))
}

type CombinationInfo struct {
	Participant int
	GroupNumver int
	RepeatCnt   int
	Trial       int
	Names       string
}

type SimulationResult struct {
	ParticipantCombinations [][][]string `json:"participantCombinations"`
	CountTable              [][]int      `json:"countTable"`
	CountTableOfElmNum      []int        `json:"countTableOfElmNum"`
	StandardDeviation       float64      `json:"standardDeviation"`
}

func NewSimulationResult(pc *model.ParticipantCombination, sr *model.ScoreRecord, sd float64, ci *CombinationInfo) *SimulationResult {
	return &SimulationResult{
		ParticipantCombinations: pc.CreateCombinationsForFront(ci.Names, ci.GroupNumver),
		CountTable:              sr.CountTables,
		CountTableOfElmNum:      sr.CountNum(ci.RepeatCnt),
		StandardDeviation:       math.Round(sd*100) / 100,
	}
}

func Simulate(c echo.Context) error {
	ci := new(CombinationInfo)
	if err := c.Bind(ci); err != nil {
		return err
	}

	if ci.Participant%ci.GroupNumver != 0 {
		return c.JSON(http.StatusBadRequest, map[string]string{"message": "割り切れない"})
	}

	betterSd := math.MaxFloat64
	var betterPc *model.ParticipantCombination
	var betterSr *model.ScoreRecord

	for i := 0; i < ci.Trial; i++ {
		pc := model.NewParticipantCombination(ci.Participant, ci.RepeatCnt)
		sr := model.NewScoreRecord(ci.Participant)

		for _, combination := range pc.Combinations {
			sr.Record(combination, ci.GroupNumver)
		}

		sd := sr.CalcScoresStandardDeviation()
		if sd < betterSd {
			betterSd = sd
			betterPc, betterSr = pc, sr
		}
	}

	nsr := NewSimulationResult(betterPc, betterSr, betterSd, ci)
	return c.JSON(http.StatusOK, nsr)
}
