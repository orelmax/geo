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

const makeId = ({ lat, lng }) => `${lat}${lng}`;

class GeoMap extends React.Component {
  mapRef = null;
  map = null;
  mapapi = null;
  circle = null;

  componentWillMount() {
    this.initMap();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.coordinates !== this.props.coordinates) {
      this.highlightAddress(nextProps);
    } else if (nextProps.coordinates !== undefined && nextProps.radius !== this.props.radius) {
      this.updateRadius(nextProps);
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

  highlightAddress({ coordinates, radius }) {
    this.map.setOptions({
      center: coordinates,
      zoom: 14,
    });

    this.circle = new this.mapapi.Circle(Object.assign({}, CIRCLE_OPTS, {
      map: this.map,
      radius,
      center: coordinates,
    }));

    this.map.data.add(new this.mapapi.Data.Feature({
      id: makeId(coordinates),
      geometry: new this.mapapi.Data.Point(coordinates),
      properties: {
        radius,
      },
    }));

    this.saveTempJson();
  }

  updateRadius({ coordinates, radius }) {
    const feature = this.map.data.getFeatureById(makeId(coordinates));
    feature.setProperty('radius', radius);

    this.circle.setRadius(radius);
    this.saveTempJson();
  }

  saveTempJson() {
    // we need to store on each change to be able to get
    // result on click from another component, like Panel
    this.map.data.toGeoJson(this.props.saveTempJson);
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
  saveTempJson: PropTypes.func.isRequired,
  radius: PropTypes.number,
};
GeoMap.defaultProps = {
  radius: undefined,
};

export default GeoMap;