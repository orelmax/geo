import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../../../components/TextInput';
import AddressField from '../AddressField';
import RadiusSlider from '../RadiusSlider';
import './Forms.css'

const MIN_RADIUS = 50;
const MAX_RADIUS = 10000;

class Form extends Component {
  state = {
    address: undefined,
    radius: true,
  }

  validateAddress = (value) => {
    if (!!value &&
        Object.hasOwnProperty.call(value, 'lat') &&
        Object.hasOwnProperty.call(value, 'lng')) {
          this.setState({ address: true });
          return true;
        }

    return false;
  }

  validateRadius = (value) => {
    if (value === '' || value === undefined) {
      this.setState({ radius: true });
      return true;
    }

    const v = typeof v !== 'number' ? parseInt(value, 10) : value;
    const valid = typeof v === 'number' && v >= MIN_RADIUS && v <= MAX_RADIUS;
    this.setState({ radius: valid });
  
    return valid;
  }

  onAddressChange = (coords) => {
    if (this.validateAddress(coords)) {
      this.props.setMapCenter(coords);
    }
  }

  onChangeRadius = (value) => {
    if (this.validateRadius(value)) {
      this.props.setRadius(value);
    }
  }

  render() {
    const { address, radius } = this.state;
    const canSubmit = address && radius;

    return (
      <div className="form">
        <AddressField
          setMapCenter={this.onAddressChange}
          hasError={!address}
        />
        <RadiusSlider
          min={MIN_RADIUS}
          max={MAX_RADIUS}
          defaultRadius={this.props.defaultRadius}
          setRadius={this.onChangeRadius}
        />
        <button
          disabled={!canSubmit}
          className="form__button"
          onClick={this.props.generateJson}
        >
          Generate GeoJSON
        </button>
      </div>
    );
  }
}

Form.propTypes = {
  setMapCenter: PropTypes.func.isRequired,
  setRadius: PropTypes.func.isRequired,
  generateJson: PropTypes.func.isRequired,
  defaultRadius: PropTypes.number.isRequired,
};

export default Form;