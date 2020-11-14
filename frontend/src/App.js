import React from 'react';
import Form from './Form';
import Result from './Result';
import http from './http';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {
        participant: 9,
        groupNumver: 3,
        repeatCnt: 3,
        trial: 10,
        names: "aさん,bさん,cさん,dさん,eさん,fさん,gさん,hさん,iさん"
      },
      result: [[]]
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const newInfoState = Object.assign({}, this.state.info)
    newInfoState[e.target.id] = e.target.value
    this.setState(
      {
        info: newInfoState
      }
    )
  }

  handleSubmit(e){
    e.preventDefault()
    return http
      .get("/simulate", {
        params: {
          participant: this.state.info.participant,
          groupNumver: this.state.info.groupNumver,
          repeatCnt: this.state.info.repeatCnt,
          trial: this.state.info.trial,
          names: this.state.info.names
        }
      })
      .then((res) => {
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
            info={this.state.info}
            handleChange = {this.handleChange}
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
