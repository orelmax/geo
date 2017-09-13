import React from 'react';
import PropTypes from 'prop-types';
import Header from './components/Header';
import Form from './components/Form';
import Result from './components/Result';
import './Panel.css';

class Panel extends React.Component {
  state = {
    canShowResult: false,
  };

  onGenerateJson = () => {
    this.setState({
      canShowResult: true,
    });
  }

  render() {
    return (
      <div className="panelWrapper">
        <Header>Panel</Header>
        <Form
          setMapCenter={this.props.setMapCenter}
          setRadius={this.props.setRadius}
          generateJson={this.onGenerateJson}
          defaultRadius={this.props.defaultRadius}
        />
        <Result
          canShowResult={this.state.canShowResult}
          code={this.props.code}
        />
      </div>
    );
  }
}

Panel.propTypes = {
  setMapCenter: PropTypes.func.isRequired,
  setRadius: PropTypes.func.isRequired,
  defaultRadius: PropTypes.number.isRequired,
  code: PropTypes.string,
}

export default Panel;