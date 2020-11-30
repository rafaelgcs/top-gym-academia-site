
import React from 'react';
import ReactDOM from 'react-dom';
// styles
import "modules/shared/assets/css/bootstrap.min.css";
import "assets/scss/paper-kit.scss";
import "modules/shared/assets/demo/demo.css";
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';

ReactDOM.render((
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
), document.getElementById('root'));

serviceWorker.unregister();
