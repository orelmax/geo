import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorText from '../ErrorText';
import './TextInput.css';

class TextInput extends Component {
  constructor(props) {
    super(props);

    this.input = null;
    this.state = {
      hasError: false,
      value: props.defaultValue,
    };
  }

  validate(value) {
    const { rule } = this.props;

    if (rule !== undefined && typeof rule === 'function') {
      return rule(value);
    }

    // no rules - than value hasn't be validated
    return true;
  }

  onType = (e) => {
    const { value } = e.target;
    const hasError = !this.validate(value);

    this.setState({
      hasError,
      value,
    }, () => {
      if (this.props.onChange && typeof this.props.onChange === 'function' ) this.props.onChange(e);
    });
  }

  render() {
    const {
      errorText,
      rule,
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
          this.state.hasError && <ErrorText>{ errorText }</ErrorText>
        }
      </div>
    );
  }
}

TextInput.propTypes = {
  rule: PropTypes.func,
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  errorText: PropTypes.string,
};
TextInput.defaultProps = {
  defaultValue: '',
  rule: undefined,
  errorText: 'Value is invalid',
};

export default TextInput;