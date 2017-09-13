import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';

const PanelHeader = props => {
  return (
    <div className="panel__header">
      { props.children }
    </div>
  );
};

PanelHeader.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PanelHeader;