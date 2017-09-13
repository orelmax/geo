import React from 'react';
import createGMapsApi from 'google-maps-api';
import { GOOGLE_API_KEY } from '../../_configs';
import './Map.css';

const mapsApi = createGMapsApi(GOOGLE_API_KEY);
const INITIAL_MAP_OPTS = {
  center: {
    lat: 10.46,
    lng: 106.42,
  },
  zoom: 13,
};

class GeoMap extends React.Component {
  mapRef = null;

  componentWillMount() {
    // this.initMap();
  }

  initMap() {
    mapsApi().then((map) => {
      new map.Map(this.mapRef, INITIAL_MAP_OPTS);
    });
  }

  render() {
    return (
      <div
        ref={(ref) => { this.mapRef = ref; }}
        className="map"
      />
    );
  }
};

export default GeoMap;