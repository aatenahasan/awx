import React from 'react';
import ReactDOM from 'react-dom';
import './setupCSP';
import '@patternfly/react-core/dist/styles/base.css';
import './border.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App hideNav={process.env.REACT_APP_BUILD_TARGET === 'without_nav'} />
  </React.StrictMode>,
  document.getElementById('app') || document.createElement('div')
);
