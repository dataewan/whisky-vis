import React, { Component } from 'react';
import './App.css';

import * as d3 from 'd3';
import * as topojson from 'topojson-client';

import Map from './Map'
import Information from './Information'
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
        <Information
          selected={this.state.selected}
        />
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
