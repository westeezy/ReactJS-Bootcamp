/// <reference path="../typings/tsd.d.ts" />

import './index.html';
import 'normalize.css/normalize.css';
import './scss/app.scss';
import 'font-awesome-webpack';
import * as React from 'react';

let context = require.context('.', true, /\.jpg?$/);
context.keys().forEach(context);

import App from './components/App/App.tsx';


function render() {
    React.render(<App/>, document.getElementsByClassName('app')[0]);
}

var node = render();
export default node;
