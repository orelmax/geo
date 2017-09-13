import React, { Component } from 'react';
import GeoMap from '../Map';
import Panel from '../Panel';
import './App.css';

class App extends Component {
  defaultRadius = 1000;
  state = {
    coordinates: undefined,
    radius: undefined,
    tempJson: undefined,
  }

  setMapCenter = (coordinates) => {
    this.setState({
      coordinates,
      // set radius for circle to default value if it hasn't been changed by user
      radius: this.state.radius === undefined ? this.defaultRadius : this.state.radius,
    });
  }

  setRadius = (radius) => {
    this.setState({ radius });
  }

  setTempJson = (tempJson) => {
    this.setState({
      tempJson: JSON.stringify(tempJson),
    });
  }

  render() {
    return (
      <div className="App">
        <Panel
          setMapCenter={this.setMapCenter}
          setRadius={this.setRadius}
          code={this.state.tempJson}
          defaultRadius={this.defaultRadius}
        />
        <GeoMap
          coordinates={this.state.coordinates}
          radius={this.state.radius}
          saveTempJson={this.setTempJson}
        />
      </div>
    );
  }
}

export default App;
