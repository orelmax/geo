import React from 'react';
import PropTypes from 'prop-types';
import './ErrorText.css';

const ErrorText = ({
  children,
}) => {
  return (
    <p className="errorText">
      { children }
    </p>
  );
};

ErrorText.propTypes = {
  children: PropTypes.string.isRequired,
}

export default ErrorText;