import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import './App.css';

import Overview from './Overview';

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)



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
          </ul>
          <Route path='/overview' component={Overview} />
          <Route path='/cluster0' component={() => <Overview cluster={'0'} />} />
          <Route path='/cluster1' component={() => <Overview cluster={'1'} />} />
          <Route path='/cluster2' component={() => <Overview cluster={'2'} />} />
          <Route path='/cluster3' component={() => <Overview cluster={'3'} />} />
          <Route path='/cluster4' component={() => <Overview cluster={'4'} />} />
          <Route path='/cluster5' component={() => <Overview cluster={'5'} />} />
        </div>
      </Router>
    )
  }
}

export default App;
