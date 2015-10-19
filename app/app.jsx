'use strict';

import './index.html';
import 'babel-core/polyfill';
import 'normalize.css/normalize.css';
import './scss/app.scss';
import 'font-awesome-webpack';

let context = require.context('.', true, /\.jpg?$/);
context.keys().forEach(context);

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
