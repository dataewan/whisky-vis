import React, { Component } from 'react';
import './App.css';

import * as d3 from 'd3';
import * as topojson from 'topojson-client';

import Map from './Map'
import whisky from './whisky.json';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <Map width={960} height={960}
          whisky={whisky}
        />
      </div>
    );
  }
}

export default App;
