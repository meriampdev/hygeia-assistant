import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './sass/index.scss';
import { Provider } from 'react-redux';
import store from './redux/store';
import AppRoutes from './AppRoutes';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store={store}>
    <AppRoutes />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
// serviceWorker.unregister();
