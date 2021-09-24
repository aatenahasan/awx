import React from 'react';
import ReactDOM from 'react-dom';

function importApp() {
  if (process.env.REACT_APP_BUILD_TARGET === 'without_nav') {
    return import('./AppWithoutNav.js');
  }

  return import('./App.js');
}

importApp().then(({ default: App }) => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('app') || document.createElement('div')
  );
});
