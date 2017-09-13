import React, { Component } from 'react';
import TextInput from '../../../../components/TextInput';
import PropTypes from 'prop-types';

class Form extends Component {
  render() {
    return (
      <div>
        <form>
          <TextInput
            placeholder="Address"
            rule={(value) => !!value}
            errorText="Address shouldn't be empty"
          />
          <TextInput
            placeholder="Radius"
            type="number"
            defaultValue={10}
            rule={(value) => {
              if (value === '' || value === undefined) return true;

              const v = parseInt(value, 10);
              return typeof v === 'number' && v > 0;
            }}
            errorText="Radius cannot be less than 0"
          />
        </form>
      </div>
    );
  }
}

Form.propTypes = {

};

export default Form;