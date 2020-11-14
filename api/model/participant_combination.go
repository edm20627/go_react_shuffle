package model

import (
	"strings"

	"github.com/edm20627/go_react_shuffle/pkg/util"
)

type ParticipantCombination struct {
	Combinations [][]int
}

func NewParticipantCombination(articipant int, repeatCnt int) *ParticipantCombination {
	combination := []int{}
	for i := 0; i < articipant; i++ {
		combination = append(combination, i)
	}

	combinations := make([][]int, repeatCnt)
	for i := 0; i < repeatCnt; i++ {
		util.Shuffle(combination)
		combinations[i] = make([]int, len(combination))
		copy(combinations[i], combination)
	}

	return &ParticipantCombination{Combinations: combinations}
}

func (pc *ParticipantCombination) CreateCombinationsForFront(names string, groupNumber int) [][][]string {
	combinationsStr := [][]string{}
	if names == "" {
		combinationsStr = util.Itoa(pc.Combinations)
	} else {
		combinationsStr = pc.replaceNumWithNames(names)
	}
	return pc.devideCombination(combinationsStr, groupNumber)
}

func (pc *ParticipantCombination) replaceNumWithNames(names string) [][]string {
	namesArr := strings.Split(names, ",")
	combinationsStr := [][]string{}

	for _, combination := range pc.Combinations {
		combinationStr := []string{}
		for _, val := range combination {
			combinationStr = append(combinationStr, namesArr[val])
		}
		combinationsStr = append(combinationsStr, combinationStr)
	}
	return combinationsStr
}

func (pc *ParticipantCombination) devideCombination(combinationsStr [][]string, groupNumber int) [][][]string {
	devideCombinations := [][][]string{}

	for _, combination := range combinationsStr {
		devideCombinations = append(devideCombinations, util.DevideArrStr(combination, groupNumber))
	}
	return devideCombinations
}

type ScoreRecord struct {
	CountTables [][]int
	Scores      []int
}

func NewScoreRecord(len int) *ScoreRecord {
	scores := make([]int, len)
	countTables := util.CreateTableInit(len)
	return &ScoreRecord{Scores: scores, CountTables: countTables}
}

func (sr *ScoreRecord) Record(participants []int, groupNumber int) {
	groops := util.DevideArr(participants, groupNumber)

	for _, group := range groops {
		sr.recordEachGroup(group)
	}
}

func (sr *ScoreRecord) recordEachGroup(group []int) {
	len := len(group)
	for i := 0; i < len; i++ {
		for j := 0; j < len; j++ {
			if i == j {
				continue
			}

			x, y := group[i], group[j]
			sr.CountTables[x][y]++
			sr.Scores[x] += sr.CountTables[x][y]
		}
	}
}

func (sr *ScoreRecord) CalcScoresStandardDeviation() float64 {
	return util.CalcStandardDeviation(sr.Scores)
}

func (sr *ScoreRecord) CountNum(repeatCnt int) []int {
	cnt := make([]int, repeatCnt+1)

	for _, row := range sr.CountTables {
		for _, v := range row {
			cnt[v]++
		}
	}
	return cnt
}
