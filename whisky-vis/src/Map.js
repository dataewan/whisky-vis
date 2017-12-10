
import React, { Component } from 'react';

import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import geo from './geo.json';

class Scotland extends React.Component {
  render() {
    const projection = this.props.proj;
    const pathGenerator = d3.geoPath().projection(projection);
    const features = topojson.feature(geo, geo.objects.tracts).features
    const coast = features.map((d, i) => <path
      key={'path'+i}
      d={pathGenerator(d)}
    />
    )
    return (
      <g>
        {coast}
      </g>
    );
  }
}

class Distileries extends React.Component{
  render(){
    const whiskyProcessed = this.props.whisky.map(d => {
      var p = [d.long, d.lat]
      var projected = this.props.proj(p);
      d['x'] = projected[0]
      d['y'] = projected[1]
      return d
    })
    const points = whiskyProcessed.map((d, i) => <circle
      key={'distillery'+i}
      cx={d.x}
      cy={d.y}
      r={3}
    />
    )
    return(
      <g>
        {points}
      </g>
    )
  }
}

class Map extends React.Component {
  constructor(props){
    super(props)
    this.proj = d3.geoAlbers()
      .center([0, 58.6])
      .rotate([4.4, 0])
      .parallels([50, 60])
      .scale(7000)
      .translate([this.props.width / 2, this.props.height / 2]);
  }

  render() {
    return (
      <svg
        ref={node => this.node = node}
        width={this.props.width}
        height={this.props.height}>
        <g>
          <Scotland proj={this.proj}/>
          <Distileries proj={this.proj} whisky={this.props.whisky} />
        </g>
      </svg>
    );
  }
}

export default Map;
