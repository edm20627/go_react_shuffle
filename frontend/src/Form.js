import React from 'react';

class Form extends React.Component {

  render() {
    return (
      <div id="inputForm">
        <form>
          <div className="form-group">
            <label htmlFor="participant">参加人数</label>
            <input type="number" className="form-control w-25" id="participant" value={this.props.participant} onChange={e => this.props.handleParticipantChange(e)}></input>
          </div>
          <div className="form-group">
            <label htmlFor="groupNumver">1グループ毎の人数</label>
            <input type="number" className="form-control w-25" id="groupNumver" value={this.props.groupNumver} onChange={e => this.props.handleGroupNumverChange(e)}></input>
          </div>
          <div className="form-group">
            <label htmlFor="repeatCnt">グループ分けの回数</label>
            <input type="number" className="form-control w-25" id="repeatCnt" value={this.props.repeatCnt} onChange={e => this.props.handleRepeatCntChange(e)}></input>
          </div>
          <div>
            <p>
              <button type="button" className="btn btn-primary rounded-circle p-0" id="detail-setting-btn"
                data-toggle="collapse" data-target="#detail-setting" aria-expanded="false"
                aria-controls="detail-setting" style={{width:"2rem", height:"2rem"}}>
                +
              </button>
              <label htmlFor="detail-setting-btn">詳細設定</label>
            </p>
            <div className="collapse" id="detail-setting">
              <div className="form-group">
                <label htmlFor="trial">試行回数</label>
                <input type="number" className="form-control w-25" id="trial" value={this.props.trial} onChange={e => this.props.handleTrialChange(e)}></input>
                <div>
                  <span>試行回数分だけランダムにグループ分けを作成し、一番重複が少ないグループ分けを結果に表示します。</span>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="names">参加者の名前</label>
                <textarea className="form-control" id="names" value={this.props.names} onChange={e => this.props.handleNamesChange(e)}></textarea>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-3" onClick={this.props.handleSubmit}>グループ分け</button>
        </form>
      </div>
    )
  }
}

export default Form;