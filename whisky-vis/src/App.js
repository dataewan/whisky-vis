import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import './App.css';

import Overview from './Overview';
import VariableProjection from './VariableProjection'
import ClusterSummary from './ClusterSummary';

class App extends Component {
  render(){
    return(
      <Router>
        <div>
          <ul>
            <li><Link to='/overview'>Overview</Link></li>
            <li><Link to='/cluster0'>Cluster 0</Link></li>
            <li><Link to='/cluster1'>Cluster 1</Link></li>
            <li><Link to='/cluster2'>Cluster 2</Link></li>
            <li><Link to='/cluster3'>Cluster 3</Link></li>
            <li><Link to='/cluster4'>Cluster 4</Link></li>
            <li><Link to='/cluster5'>Cluster 5</Link></li>
            <li><Link to='/cluster6'>Cluster 6</Link></li>
            <li><Link to='/cluster7'>Cluster 7</Link></li>
            <li><Link to='/cluster8'>Cluster 8</Link></li>
            <li><Link to='/colourclusters'>Colour clusters</Link></li>
            <li><Link to='/variableprojection'>Variable Projection</Link></li>
            <li><Link to='/islay'>Islay</Link></li>
            <li><Link to='/speyside'>Speyside</Link></li>
            <li><Link to='/summaryclusters'>Summary of clusters</Link></li>
          </ul>
          <Route path='/overview' component={Overview} />
          <Route path='/cluster0' component={() => <Overview cluster={'0'} />} />
          <Route path='/cluster1' component={() => <Overview cluster={'1'} />} />
          <Route path='/cluster2' component={() => <Overview cluster={'2'} />} />
          <Route path='/cluster3' component={() => <Overview cluster={'3'} />} />
          <Route path='/cluster4' component={() => <Overview cluster={'4'} />} />
          <Route path='/cluster5' component={() => <Overview cluster={'5'} />} />
          <Route path='/cluster6' component={() => <Overview cluster={'6'} />} />
          <Route path='/cluster7' component={() => <Overview cluster={'7'} />} />
          <Route path='/cluster8' component={() => <Overview cluster={'8'} />} />
          <Route path='/colourclusters' component={() => <Overview colourcluster={true} />} />
          <Route path='/variableprojection' component={VariableProjection} spey={true} />
          <Route path='/islay' component={() => <Overview 
              rotate0={6.25}
              rotate1={1.92}
              scale={57400}
              colourcluster={true}
              />} />
          <Route path='/speyside' component={() => <Overview 
              rotate0={3.93}
              rotate1={0.5}
              scale={24800}
              colourcluster={true}
              spey={true}
              />} />
            <Route path='/summaryclusters' component={ClusterSummary} />
        </div>
      </Router>
    )
  }
}

export default App;
