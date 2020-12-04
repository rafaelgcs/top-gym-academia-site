
import React from 'react';
import ReactDOM from 'react-dom';
// styles
import "modules/shared/assets/css/bootstrap.min.css";
import "assets/scss/paper-kit.scss";
import "modules/shared/assets/demo/demo.css";
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
import { Provider } from 'react-redux';
import store from './store'

ReactDOM.render((
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
), document.getElementById('root'));

serviceWorker.unregister();
