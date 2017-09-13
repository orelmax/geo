import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../../../components/TextInput';
import AddressField from '../AddressField';
import './Forms.css'

class Form extends Component {
  state = {
    address: false,
    radius: true,
  }

  onSubmit = (e) => {
    e.preventDefault();
    
    const { address, radius } = this.state;

    if (address && radius) console.log('submit call');
  }

  validateAddress = (value) => {
    this.setState({ address: !!value });
  
    return !!value;
  }

  validateRadius = (value) => {
    if (value === '' || value === undefined) {
      this.setState({ radius: true });
      return true;
    }
  
    const v = parseInt(value, 10);
    const valid = typeof v === 'number' && v > 0;
    this.setState({ radius: valid });
  
    return valid;
  }

  render() {
    const { address, radius } = this.state;
    const canSubmit = address && radius;

    return (
      <div className="form">
        <form onSubmit={this.onSubmit} >
          <AddressField
            validate={this.validateAddress}
            setMapCenter={this.props.setMapCenter}
          />
          
          <TextInput
            placeholder="Radius"
            type="number"
            name="radius"
            defaultValue={10}
            rule={this.validateRadius}
            errorText="Radius cannot be less than 0"
          />
          <button
            disabled={!canSubmit}
            type="submit"
            className="form__button"
          >
            Generate GeoJSON
          </button>
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  setMapCenter: PropTypes.func.isRequired,
};

export default Form;