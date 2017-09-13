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

class GeoMap extends React.Component {
  mapRef = null;
  map = null;

  componentWillMount() {
    this.initMap();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.coordinates !== this.props.coordinates) {
      this.map.setOptions({
        center: nextProps.coordinates,
        zoom: 14,
      });
    }
  }

  async initMap() {
    try {
      const mapapi = await getGoogleMapApi();
      this.map = new mapapi.Map(this.mapRef, INITIAL_MAP_OPTS);
    } catch (err) {
      console.error(err);
    }
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