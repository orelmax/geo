import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorText from '../ErrorText';
import './TextInput.css';

class TextInput extends Component {
  constructor(props) {
    super(props);

    this.input = null;
    this.state = {
      value: props.defaultValue,
    };
  }

  onType = (e) => {
    const { value } = e.target;

    this.setState({
      value,
    }, () => {
      if (this.props.onChange && typeof this.props.onChange === 'function' ) this.props.onChange(e);
    });
  }

  render() {
    const {
      errorText,
      hasError,
      ...rest
    } = this.props;

    return (
      <div className="inputWrapper">
        <input
          ref={(elem) => {
            // "inject" actual node to the instance of TextInput
            return this.input = elem;
          }}
          className="input"
          onChange={this.onType}
          {...rest}
        />

        {
          hasError && <ErrorText>{ errorText }</ErrorText>
        }
      </div>
    );
  }
}

TextInput.propTypes = {
  hasError: PropTypes.bool.isRequired,
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  errorText: PropTypes.string,
};
TextInput.defaultProps = {
  defaultValue: '',
  errorText: 'Value is invalid',
};

export default TextInput;