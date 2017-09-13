import React from 'react';
import PropTypes from 'prop-types';
import getGoogleMapApi from '../../utils/googleMap';
import './Map.css';

const INITIAL_MAP_OPTS = {
  center: {
    lat: 10.46,
    lng: 106.42,
  },
  zoom: 13,
};

const CIRCLE_OPTS = {
  strokeColor: '#00c5ff',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#00c5ff',
  fillOpacity: 0.35,
}

class GeoMap extends React.Component {
  mapRef = null;
  map = null;
  mapapi = null;

  componentWillMount() {
    this.initMap();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.coordinates !== this.props.coordinates) {
      this.highlightAddress(nextProps.coordinates);
    }
  }
  

  async initMap() {
    try {
      this.mapapi = await getGoogleMapApi();
      this.map = new this.mapapi.Map(this.mapRef, INITIAL_MAP_OPTS);
    } catch (err) {
      console.error(err);
    }
  }

  highlightAddress(coords) {
    this.map.setOptions({
      center: coords,
      zoom: 14,
    });
    new this.mapapi.Circle(Object.assign({}, CIRCLE_OPTS, {
      map: this.map,
      radius: 1000,
      center: coords,
    }));
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

GeoMap.propTypes = {
  coordinates: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
}

export default GeoMap;