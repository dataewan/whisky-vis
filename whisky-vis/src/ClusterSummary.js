import React from 'react'
import { map } from 'd3-collection';

import Radial from './Radial'

import whisky from './whisky.json';

class Summary extends React.Component {
  render() {
    const theme ={
      seafill: 'seagreen',
      landfill: 'tan',
      riverColour: 'blue',

      selectedColour: '#ff0a78',
      unselectedColour:'#401227',
      disabledpointfill: '#E4DBDF',

      radialOverall: 'cyan',
      radialFill: 'green',
    }
    const number = whisky.filter(
      d => d.cluster === `${this.props.cluster}`
    ).length
    return (
      <div>
        <h1>Cluster {this.props.cluster}</h1>
        <h3>Contains {number} whiskies</h3>
        <Radial
          {...theme}
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
    const clusters = map(whisky, d=>d.cluster).keys().sort()
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
