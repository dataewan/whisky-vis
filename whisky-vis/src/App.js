import React, { Component } from 'react';
import './App.css';

import * as d3 from 'd3';
import * as topojson from 'topojson-client';

import Map from './Map'
import InformationTable from './InformationTable'
import Radial from './Radial'
import whisky from './whisky.json';

class App extends Component {
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
        />
      </div>
    );
  }
}

export default App;
