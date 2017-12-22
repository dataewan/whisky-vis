import React from 'react';

import Map from './Map'
import whisky from './whisky.json';

class Slider extends React.Component {
  render() {
    console.log(this.props.onSlide)
    const {variable} = this.props
    return (
      <div>
        <h5>{variable}</h5>
        <div>{this.props.state[variable]}</div>
        <input
          id={variable}
          type='range'
          min={this.props.min}
          value={this.props.state[variable]}
          max={this.props.max}
          step={this.props.step}
          onChange={(e) => this.props.onSlide(e.target.value, variable)}
        />
      </div>
    );
  }
}

class VariableProjection extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      selected: null,
      center0: 0,
      center1: 57.8,
      rotate0: 4.4,
      rotate1: 0,
      scale: 7000
    }
    this.onHover.bind(this)
    this.onSlide.bind(this)
  }

  onHover = (d) => {
    this.setState({
      selected: d
    })
  }

  onSlide = (value, variable) => {
    let newvalue = {};
    newvalue[variable] = value;
    this.setState(
      newvalue
    )
  }

  render() {
    const name = this.state.selected ? this.state.selected.formatname : null
    return (
      <div className="App">
        <div className='information'>
          <div>{name}</div>
          <Slider variable={'center0'} state={this.state} onSlide={this.onSlide} min={-1} max={5} step={0.01} />
          <Slider variable={'center1'} state={this.state} onSlide={this.onSlide} min={55} max={60} step={0.01} />
          <Slider variable={'rotate0'} state={this.state} onSlide={this.onSlide} min={2} max={10} step={0.01} />
          <Slider variable={'rotate1'} state={this.state} onSlide={this.onSlide} min={-3} max={3} step={0.01} />
          <Slider variable={'scale'} state={this.state} onSlide={this.onSlide} min={2000} max={100000} step={100} />

        </div>
        <Map width={500} height={800}
          whisky={whisky}
          onHover={this.onHover}
          selected={this.state.selected}
          cluster={this.props.cluster}
          center0={this.state.center0}
          center1={this.state.center1}
          rotate0={this.state.rotate0}
          rotate1={this.state.rotate1}
          scale={this.state.scale}
          spey={true}
        />
      </div>
    );
  }
}

export default VariableProjection;
