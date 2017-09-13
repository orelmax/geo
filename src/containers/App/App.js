import React, { Component } from 'react';
import GeoMap from '../Map';
import Panel from '../Panel';
import './App.css';

class App extends Component {
  state = {
    coordinates: undefined,
  }

  setMapCenter = (coordinates) => {
    this.setState({ coordinates });
  }

  render() {
    return (
      <div className="App">
        <Panel setMapCenter={this.setMapCenter} />
        <GeoMap coordinates={this.state.coordinates} />
      </div>
    );
  }
}

export default App;
