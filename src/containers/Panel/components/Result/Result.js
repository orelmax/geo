import React from 'react';
import PropTypes from 'prop-types';
import './Result.css';

const Result = props => {
  return (
    <div className="result">
      <pre className="result__code">{ props.code }</pre>
    </div>
  );
};

Result.propTypes = {
  code: PropTypes.string,
};
Result.defaultProps = {
  code: '{"type":"FeatureCollection","features": []}',
};

export default Result;