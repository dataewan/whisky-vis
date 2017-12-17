import React from 'react';
import * as d3 from 'd3'

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
      this.heightscales[d] = d3.scaleLinear()
          .domain([0, 5])
          .range([this.middle * 2, scalelength])
    })

    this.anglescale = d3.scaleBand()
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
      const value = selected[d] ? selected[d] : 0
      const r = this.heightscales[d](value)
      const x = r * Math.sin(phi)
      // remember that down is positive in svg space
      const y = -r * Math.cos(phi)
      const arc = d3.arc()
        .innerRadius(this.heightscales[d](0))
        .outerRadius(r)
        .startAngle(phi)
        .endAngle(phi+this.anglescale.bandwidth())

      return <path
        key={'arc'+i}
        d={arc()}
      />

    })
    return(
      points
    )
  }


  render() {
    window.d3 = d3;
    window.whisky = this.props.whisky;
    const points = this.props.selected ? this.calcpoints() : null
    return (
      <svg 
        className='radial'
        width={this.props.width}
        height={this.props.height}
        fill={'#aaa'}
      >
        <g transform={`translate(${this.props.width / 2} ${this.props.height - this.bottomPad})`}>
          {points}
        </g>
      </svg>
    );
  }
}

export default Radial;
