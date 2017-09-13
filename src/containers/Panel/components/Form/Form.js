import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../../../components/TextInput';
import AddressField from '../AddressField';
import './Forms.css'

const radiusRegExp = new RegExp('^[0-9]+$');

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

    if (!radiusRegExp.test(value)) {
      this.setState({ radius: false });
      return false;
    }

    const v = parseInt(value, 10);
    const valid = typeof v === 'number' && v > 0 && v < 50000;
    this.setState({ radius: valid });
  
    return valid;
  }

  onAddressChange = (coords) => {
    if (this.validateAddress(coords)) {
      this.props.setMapCenter(coords);
    }
  }

  onChangeRadius = (e) => {
    if (this.validateRadius(e.target.value)) {
      this.props.setRadius(parseInt(e.target.value, 10));
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
        
        <TextInput
          placeholder="Radius"
          type="number"
          name="radius"
          defaultValue={this.props.defaultRadius}
          onChange={this.onChangeRadius}
          hasError={!radius}
          errorText="Radius cannot be less than 0"
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