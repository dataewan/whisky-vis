
import React, { Component } from 'react';

import { max } from 'd3-array'
import { map } from 'd3-collection'
import { scaleOrdinal } from 'd3-scale'
import { cubehelix } from 'd3-color'
import { geoPath, geoAlbers } from 'd3-geo'
import * as topojson from 'topojson-client';
import geo from './geo.json';
import rivers from './rivers.json';
import { schemeSet2 as scheme } from 'd3-scale-chromatic';


window.topojson = topojson;
window.rivers = rivers;

class Scotland extends Component {
  render() {
    const projection = this.props.proj;
    const pathGenerator = geoPath().projection(projection);
    const features = topojson.feature(geo, geo.objects.tracts).features
    const riverfeatures = topojson.feature(rivers, rivers.objects.tracts).features
    const coast = features.map((d, i) => <path
      className='scotland'
      key={'path'+i}
      d={pathGenerator(d)}
      fill={this.props.landfill}
      stroke={'none'}
    />
    )
    let riverpath = null
    if (this.props.spey){
      riverpath = riverfeatures.map((d, i) => <path
        className='river'
        key={`riverpath${i}`}
        d={pathGenerator(d)}
        stroke={this.props.riverColour}
        fill={'none'}
      />)
    }
    return (
      <g>
        {coast}
        {riverpath}
      </g>
    );
  }
}

class Distileries extends Component{
  render(){
    const calcpointfill = (point, selectedRow) => {
      const { selectedColour, unselectedColour, disabledColour } = this.props
      const colourScaleColour = this.props.colourscale(point.cluster)
      let selectedCSColour = cubehelix(colourScaleColour)
      selectedCSColour.l = max([0.85, selectedCSColour.l])
      // find out if this cluster should be enabled or not.
      if (this.props.cluster) {
        // if we're only highlighting a specific cluster
        if (this.props.cluster === point.cluster){
          // this should be the selected point
          return point.RowID === selectedRow ? selectedCSColour : colourScaleColour;
        } else {
          // this point should be disabled
          return disabledColour
        }
      }
      if (this.props.colourcluster){
        // we're colouring points by the cluster
        return point.RowID === selectedRow ? selectedCSColour : colourScaleColour;
      }
      return point.RowID === selectedRow ? selectedColour : unselectedColour;
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
    let points = whiskyProcessed.map((d, i) => {
      return(
        <circle
          stroke={'white'}
          strokeWidth={0.5}
          key={'distillery'+i}
          cx={d.x}
          cy={d.y}
          r={Math.pow(this.props.scale / 7000, 1/9) * 3}
          onMouseEnter={enabled(d) ? () => {this.props.onHover(d)} : null}
          fill={calcpointfill(d, selectedRow)}
          className={enabled(d) ? 'enabled' : 'disabled'}
        />
      )
    }
    )
    points = points.sort((a, b) => {
      if (a.props.className === b.props.className){
        return 0;
      }
      if (a.props.className === 'disabled'){
        return -1;
      }
      if (b.props.className === 'disabled'){
        return 1;
      }
      return a > b

    })
    return(
      <g>
        {points}
      </g>
    )
  }
}

class Map extends Component {
  render() {
    const disabledColour = this.props.disabledColour;
    const center0 = this.props.center0 ? this.props.center0 : 0;
    const center1 = this.props.center1 ? this.props.center1 : 57.8;
    const rotate0 = this.props.rotate0 ? this.props.rotate0 : 4.4;
    const rotate1 = this.props.rotate1 ? this.props.rotate1 : 0;
    const scale = this.props.scale ? this.props.scale : 7000;
    const clusters = map(this.props.whisky, d => d.cluster).keys().sort();
    const colourscale = scaleOrdinal(scheme, clusters.length)
      .domain(clusters)

    const legendpoints = clusters.map((d, i) => {
      let fill = colourscale(d)
      if (this.props.cluster && this.props.cluster !== d){
        fill = disabledColour
      }
      return(
        <g 
          key={`legendpoint${i}`}
          transform={`translate (30 ${i*20})`}>
          <circle
            cx={-10}
            cy={-5}
            r={5}
            fill={fill}
          />
          <text>{`group ${d}`}</text>
        </g>
      )
    })

    const legend = this.props.colourcluster || this.props.cluster ? <g
      transform='translate(0 30)'
    >
      {legendpoints}
    </g> : null

    this.proj = geoAlbers()
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
          height={this.props.height}
          style={{
            backgroundColor: `${this.props.seafill}`
          }}
        >
          <g>
            <Scotland 
              landfill={this.props.landfill}
              spey={this.props.spey}
              riverColour={this.props.riverColour}
              proj={this.proj}
            />
            <Distileries 
              selectedColour={this.props.selectedColour}
              unselectedColour={this.props.unselectedColour}
              disabledColour={this.props.disabledColour}
              cluster={this.props.cluster}
              colourcluster={this.props.colourcluster}
              whisky={this.props.whisky}
              selected={this.props.selected}
              proj={this.proj} 
              onHover={(d) => this.props.onHover(d)}
              colourscale={colourscale}
              scale={scale}
            />
          </g>
          {legend}
        </svg>
      </div>
    );
  }
}

export default Map;
