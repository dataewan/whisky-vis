import React from 'react'
import * as d3 from 'd3'

import Radial from './Radial'

import whisky from './whisky.json';

class Summary extends React.Component {
  render() {
    const number = whisky.filter(
      d => d.cluster === `${this.props.cluster}`
    ).length
    return (
      <div>
        <h1>Cluster {this.props.cluster}</h1>
        <h3>Contains {number} whiskies</h3>
        <Radial
          whisky={whisky}
          width={400}
          height={300}
          cluster={`${this.props.cluster}`}
        />
      </div>
    );
  }
}


class ClusterSummary extends React.Component {
  render() {
    const clusters = d3.map(whisky, d=>d.cluster).keys().sort()
    const summaries = clusters.map((d, i) => {
      return (<Summary key={`summary${i}`} cluster={d} />)
    })
    return (
      <div>
        <Summary cluster={'all'} />
        {summaries}
      </div>
    );
  }
}

export default ClusterSummary
