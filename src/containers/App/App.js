import React, { Component } from 'react';
import GeoMap from '../Map';
import Panel from '../Panel';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Panel />
        <GeoMap />
      </div>
    );
  }
}

export default App;
