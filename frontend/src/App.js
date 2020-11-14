import React from 'react';
import Form from './Form';
import Result from './Result';
import http from './http';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      participant: 9,
      groupNumver: 3,
      repeatCnt: 3,
      trial: 10,
      names: "aさん,bさん,cさん,dさん,eさん,fさん,gさん,hさん,iさん",
      result: [[]]
    }

    this.handleParticipantChange = this.handleParticipantChange.bind(this)
    this.handleGroupNumverChange = this.handleGroupNumverChange.bind(this)
    this.handleRepeatCntChange = this.handleRepeatCntChange.bind(this)
    this.handleTrialChange = this.handleTrialChange.bind(this)
    this.handleNamesChange = this.handleNamesChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleParticipantChange(e) {
    this.setState(
      {
        participant: e.target.value,
      }
    )
  }

  handleGroupNumverChange(e) {
    this.setState(
      {
        groupNumver: e.target.value,
      }
    )
  }

  handleRepeatCntChange(e) {
    this.setState(
      {
        repeatCnt: e.target.value,
      }
    )
  }

  handleTrialChange(e) {
    this.setState(
      {
        trial: e.target.value,
      }
    )
  }

  handleNamesChange(e) {
    this.setState(
      {
        names: e.target.value,
      }
    )
  }

  handleSubmit(e){
    e.preventDefault()
    return http
      .get("/simulate", {
        params: {
          participant: this.state.participant,
          groupNumver: this.state.groupNumver,
          repeatCnt: this.state.repeatCnt,
          trial: this.state.trial,
          names: this.state.names
        }
      })
      .then((res) => {
        console.log(res.data.participantCombinations);
        this.setState({result: res.data.participantCombinations})
      })
      .catch(error => {
        alert(error);
      })
  }
  render() {
    return (
      <main className="margin-side">
        <h1 className="container mt-3">ランダムにグループ分け</h1>
        <p className="container">交流会などで複数回グループ分けを行う際に、なるべく重複がないようにランダムにグループ分けをします。</p>
        <div className="container mt-3">
          <Form
            participant={this.state.participant}
            groupNumver={this.state.groupNumver}
            repeatCnt={this.state.repeatCnt}
            trial={this.state.trial}
            names={this.state.names}
            handleParticipantChange = {this.handleParticipantChange}
            handleGroupNumverChange = {this.handleGroupNumverChange}
            handleRepeatCntChange = {this.handleRepeatCntChange}
            handleTrialChange = {this.handleTrialChange}
            handleNamesChange = {this.handleNamesChange}
            handleSubmit = {this.handleSubmit}
          />
          <Result
            result={this.state.result}
          />
        </div>
      </main>
    );
  }
}

export default App;
