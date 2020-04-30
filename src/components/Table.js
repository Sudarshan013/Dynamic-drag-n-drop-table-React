import React, { Component } from 'react'
export default class Table extends Component {
  renderHeaders = () => {
    let { headers } = this.props
    let tr = []
    console.log(headers)
    headers.map((header) => {
      tr.push(<th>{header.name}</th>)
    })
    return tr
  }
  renderRows = () => {
    let { rows, headers } = this.props
    let tr = []
    rows.map((row) => {
      let td = []
      for (var h = 0; h < headers.length; h++) {
        for (let [key, value] of Object.entries(row)) {
          if (headers[h].value === key) {
            td.push(<td>{value}</td>)
          }
        }
      }
      tr.push(<tr>{td}</tr>)
    })
    return tr
  }
  render() {
    return (
      <div className="flex-container">
        <table
          className="bp3-html-table bp3-interactive"
          style={{ color: 'black' }}
        >
          <tbody>
            <tr>{this.renderHeaders()}</tr>
            {this.renderRows()}
          </tbody>
        </table>
      </div>
    )
  }
}
