import React from 'react';
import Header from './components/Header';
import Form from './components/Form';
import Result from './components/Result';
import './Panel.css';

const Panel = () => {
  return (
    <div className="panelWrapper">
      <Header>Panel</Header>
      <Form />
      <Result />
    </div>
  );
};

export default Panel;