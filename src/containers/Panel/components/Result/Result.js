import React from 'react';
import PropTypes from 'prop-types';
import './Result.css';

const DEFAULT_TEXT = 'Nothing to show';

const Result = props => {
  return (
    <div className="result">
      <pre className="result__code">
        { props.canShowResult ? props.code : DEFAULT_TEXT }
      </pre>
    </div>
  );
};

Result.propTypes = {
  code: PropTypes.string,
  canShowResult: PropTypes.bool.isRequired,
};
Result.defaultProps = {
  code: undefined,
};

export default Result;