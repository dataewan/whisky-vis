import React from 'react';

import * as topojson from 'topojson-client';

import Map from './Map'
import InformationTable from './InformationTable'
import Radial from './Radial'
import whisky from './whisky.json';


class Overview extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      selected: null
    }
    this.onHover.bind(this)
  }

  onHover = (d) => {
    this.setState({
      selected: d
    })
  }

  render() {
    return (
      <div className="App">
        <div className='information'>
          <InformationTable
            selected={this.state.selected}
          />
          <Radial 
            selected={this.state.selected}
            whisky={whisky}
            width={400} height={300}
          />
        </div>
        <Map width={500} height={800}
          whisky={whisky}
          onHover={this.onHover}
          selected={this.state.selected}
          cluster={this.props.cluster}
          center0={this.props.center0}
          center1={this.props.center1}
          rotate0={this.props.rotate0}
          rotate1={this.props.rotate1}
          scale={this.props.scale}
          colourcluster={this.props.colourcluster}
        />
      </div>
    );
  }
}

export default Overview;
