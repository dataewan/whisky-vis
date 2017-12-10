import React, { Component } from 'react';
import './App.css';

import * as d3 from 'd3';
import * as topojson from 'topojson-client';

import geo from './geo.json';
import whisky from './whisky.json';

class App extends Component {
  constructor(props) {
    super(props);
    window.d3 = d3;
    this.features = topojson.feature(geo, geo.objects.tracts).features
    this.proj = d3.geoAlbers()
      .center([0, 58.6])
      .rotate([4.4, 0])
      .parallels([50, 60])
      .scale(7000)
      .translate([960 / 2, 960 / 2]);
    this.whisky = whisky
  }

  componentDidMount() {
    this.plotmap()
  }

  componentDidUpdate(prevProps, prevState) {
    this.plotmap()
  }

  plotmap(){
    var svg = d3.select(this.node)
    var path = d3.geoPath().projection(this.proj);
    var g = svg.append('g')

    g.selectAll('.coast')
      .data(this.features)
      .enter().append('path')
      .attr('class', 'coast')
      .attr('d', path)

    var whiskyProcessed = this.whisky.map(d => {
      var p = [d.long, d.lat]
      var projected = this.proj(p);
      d['x'] = projected[0]
      d['y'] = projected[1]
      return d
    })

    g.selectAll('circle')
      .data(whiskyProcessed)
      .enter()
      .append('circle') 
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', 3)

  }

  render() {
    return (
      <div className="App">
        <svg
          ref={node => this.node = node}
          width={960}
          height={960} />
      </div>
    );
  }
}

export default App;
