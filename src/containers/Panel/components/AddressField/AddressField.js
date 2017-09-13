import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getGoogleMapApi from '../../../../utils/googleMap';
import TextInput from '../../../../components/TextInput';

class AddressField extends Component {
  autocomplete = null;
  inputRef = null;

  componentDidMount() {
    this.initSearchBox();
  }

  async initSearchBox() {
    try {
      const mapapi = await getGoogleMapApi();
      this.autocomplete = new mapapi.places.Autocomplete(this.inputRef.input);

      this.autocomplete.addListener('place_changed', this.onPlaceSelect);
    } catch (err) {
      console.error(err);
    }
  }

  onPlaceSelect = () => {
    const result = this.autocomplete.getPlace();
    const nextCenter = {
      lat: result.geometry.location.lat(),
      lng: result.geometry.location.lng(),
    };

    this.props.setMapCenter(nextCenter);
  }

  saveRef = (ref) => {
    if (!!ref) {
      this.inputRef = ref;
    }
  }

  render() {
    return (
      <div>
        <TextInput
          placeholder="Address"
          name="address"
          hasError={this.props.hasError}
          errorText="Address shouldn't be empty"
          ref={this.saveRef}
        />
      </div>
    );
  }
}

AddressField.propTypes = {
  hasError: PropTypes.bool.isRequired,
  setMapCenter: PropTypes.func.isRequired,
};

export default AddressField;