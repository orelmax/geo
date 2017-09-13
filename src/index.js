import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import initGMapApi from './utils/googleMap';
import registerServiceWorker from './registerServiceWorker';

initGMapApi();

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
