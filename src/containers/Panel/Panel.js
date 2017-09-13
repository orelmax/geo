import React from 'react';
import PropTypes from 'prop-types';
import Header from './components/Header';
import Form from './components/Form';
import Result from './components/Result';
import './Panel.css';

class Panel extends React.Component {
  state = {
    code: undefined,
  };

  render() {
    return (
      <div className="panelWrapper">
        <Header>Panel</Header>
        <Form setMapCenter={this.props.setMapCenter} />
        <Result code={this.state.code} />
      </div>
    );
  }
}

Panel.propTypes = {
  setMapCenter: PropTypes.func.isRequired,
}

export default Panel;