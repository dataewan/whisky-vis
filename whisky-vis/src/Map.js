
import React, { Component } from 'react';

import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import geo from './geo.json';

class Scotland extends Component {
  render() {
    const projection = this.props.proj;
    const pathGenerator = d3.geoPath().projection(projection);
    const features = topojson.feature(geo, geo.objects.tracts).features
    const coast = features.map((d, i) => <path
      className='scotland'
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

class Distileries extends Component{
  render(){
    const calcpointclass = (point, selectedRow) => {
      // find out if this cluster should be enabled or not.
      if (this.props.cluster) {
        if (this.props.cluster === point.cluster){
          return point.RowID === selectedRow ? 'selected' : 'notselected'
        } else {
          return 'disabled'
        }
      }
      return point.RowID === selectedRow ? 'selected' : 'notselected'
    }
    const whiskyProcessed = this.props.whisky.map(d => {
      var p = [d.long, d.lat]
      var projected = this.props.proj(p);
      d['x'] = projected[0]
      d['y'] = projected[1]
      return d
    })
    const selectedRow = this.props.selected ? this.props.selected.RowID : null
    const enabled = (point) => this.props.cluster ? this.props.cluster === point.cluster : true
    const points = whiskyProcessed.map((d, i) => <circle
      key={'distillery'+i}
      cx={d.x}
      cy={d.y}
      r={3}
      onMouseEnter={enabled(d) ? () => {this.props.onHover(d)} : null}
      className = { calcpointclass(d, selectedRow) }
    />
    )
    return(
      <g>
        {points}
      </g>
    )
  }
}

class Map extends Component {
  render() {
    const center0 = this.props.center0 ? this.props.center0 : 0;
    const center1 = this.props.center1 ? this.props.center1 : 57.8;
    const rotate0 = this.props.rotate0 ? this.props.rotate0 : 4.4;
    const rotate1 = this.props.rotate1 ? this.props.rotate1 : 0;
    const scale = this.props.scale ? this.props.scale : 7000;
    this.proj = d3.geoAlbers()
      .center([center0, center1])
      .rotate([rotate0, rotate1])
      .parallels([50, 60])
      .scale(scale)
      .translate([this.props.width / 2, this.props.height / 2]);
    return (
      <div className='map'>
        <svg
          ref={node => this.node = node}
          className='map'
          width={this.props.width}
          height={this.props.height}>
          <g>
            <Scotland proj={this.proj}/>
            <Distileries 
              proj={this.proj} 
              whisky={this.props.whisky} 
              onHover={(d) => this.props.onHover(d)}
              selected={this.props.selected}
              cluster={this.props.cluster}
            />
          </g>
        </svg>
      </div>
    );
  }
}

export default Map;
