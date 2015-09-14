'use strict';

import './_App.scss';

import React from 'react';
import Header from '../Header/Header';
import MovieTile from '../Movietile/MovieTile';

export default class App extends React.Component {

  constructor(...args) {
    super(...args);
  }

  render() {
    return (
      <div className="app">
        <Header />
        <MovieTile />
      </div>
    );
  }
}
