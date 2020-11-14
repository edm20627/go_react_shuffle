import React from 'react';

class Result extends React.Component {
  render() {
    return (
      <div id="result" className="mt-5">
        <h2>グループ分け結果</h2>
        {this.props.result.map((result, index) =>
          <div className="mt-2" key={index}>
            <span className="lead">{index + 1}回目</span>
            <table className="table table-bordered mt-1">
              <tbody>
                {result.map((data, index) =>
                  <tr key={index}>
                    <td className="w-25">グループ{index + 1}</td>
                    {data.map((test) =>
                      <td key={test}>{test}</td>
                    )}
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    )
  }
}

export default Result;