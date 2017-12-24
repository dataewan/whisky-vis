import React from 'react';
import { scaleLinear, scaleBand } from 'd3-scale';
import { max, mean } from 'd3-array';
import { arc } from 'd3-shape'

const SCALEORDER = [
  "Body",
  "Tobacco",
  "Medicinal",
  "Smoky",
  "Spicy",
  "Fruity",
  "Floral",
  "Nutty",
  "Malty",
  "Honey",
  "Sweetness",
  "Winey",
]

class Radial extends React.Component {
  constructor(props){
    super(props)
    this.middle = 25
    const scalelength = (this.props.width / 2) ;
    this.heightscales = {}
    SCALEORDER.map(d => {
      const dimensionValues = this.props.whisky.map(w => w[d])
      this.heightscales[d] = scaleLinear()
          .domain([0, max(dimensionValues)])
          .range([this.middle * 2, scalelength])
    })

    this.anglescale = scaleBand()
      .domain(SCALEORDER)
      .paddingInner(0.1)
      .range([-Math.PI / 2, Math.PI / 2])

    this.bottomPad = 10

    window.anglescale = this.anglescale
    window.heightscales = this.heightscales

    this.calcpoints.bind(this)

  }

  calcpoints(){
    const selected = this.props.selected;
    const points = SCALEORDER.map((d, i) => {
      const phi = this.anglescale(d)
      const value = selected ? selected[d] ? selected[d] : 0 : 0
      const r = this.heightscales[d](value)
      const markerarc = arc()
        .innerRadius(this.heightscales[d](0))
        .outerRadius(r)
        .startAngle(phi)
        .endAngle(phi+this.anglescale.bandwidth())

      return <path
        key={'arc'+i}
        className='radial'
        d={markerarc()}
        fill={this.props.radialFill}
      />

    })
    return(
      points
    )
  }

  calclabels(){

    return SCALEORDER.map((d, i) => {
      const phi = this.anglescale(d) + (
        this.anglescale.bandwidth() / 2
      )
      const r = this.heightscales[d](0) + 1
      const x = r * Math.sin(phi)
      // remember that down is positive in svg space
      const y = -r * Math.cos(phi)

      const textanglerotate = (theta) => {
        if (theta > 0){
          return -90 + theta * (180 / Math.PI)
        } else{
          return 90 + theta * (180 / Math.PI)
        }
      }

      const textanchor = phi > 0 ? 'start' : 'end'
      return <text
        key={'label'+i}
        textAnchor={textanchor}
        dy={'0.5em'}
        transform={`translate(${x}, ${y})rotate(${textanglerotate(phi)})`}
        fontSize={8}
        className='radiallabel'
        fill='black'
        >
          {d}
        </text>
    })
  }

  averagewhisky(){
    // going to put two sets of markers on this radial chart to show
    // the average value of this cluster, and also the average value
    // of the average whisky
    const { whisky } = this.props
    const markers = SCALEORDER.map((d, i) => {
      const overallvalue = mean(
        whisky.map(k => k[d])
      )
      const clustervalue = mean(
        whisky.map(k => k.cluster === this.props.cluster ? k[d] : null)
      )

      const phi = this.anglescale(d)
      const zeroval = this.heightscales[d](0)
      // first make the overall marker
      const overallr = overallvalue ? this.heightscales[d](overallvalue) : 0
      const overallarc = arc()
        .innerRadius(zeroval)
        .outerRadius(overallr)
        .startAngle(phi)
        .endAngle(phi + this.anglescale.bandwidth())

      // now make the marker for the cluster
      const clusterr = max(
        [
          clustervalue ? this.heightscales[d](clustervalue) : 0,
          zeroval
        ]
      )

      const clusterarc = arc()
        .innerRadius(zeroval)
        .outerRadius(clusterr)
        .startAngle(phi)
        .endAngle(phi + this.anglescale.bandwidth())

      return <g
          key={`overallarc${i}`}
        >
        <path
          className='radialcluster'
          d={clusterarc()}
          fill={this.props.radialFill}
        />
        <path
          className='radialoverall'
          d={overallarc()}
          fill={'none'}
          stroke={this.props.radialOverall}
        />
      </g>
    })
    return markers
  }

  render() {
    const points = this.props.selected ? this.calcpoints() : null
    const averagewhisky = this.props.cluster !== null ? this.averagewhisky() : null
    const labels = this.calclabels()
    return (
      <svg 
        width={this.props.width}
        height={this.props.height}
        className='radial'
      >
        <g transform={`translate(${this.props.width / 2} ${this.props.height - this.bottomPad})`}>
          {points}
          {averagewhisky}
          {labels}
        </g>
      </svg>
    );
  }
}

export default Radial;
