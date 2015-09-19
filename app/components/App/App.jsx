'use strict';

import './_App.scss';

import React from 'react';
import Header from '../Header/Header';
import MovieList from '../MovieList/MovieList';
import mockData from '../../mock/movieTitles.json';

export default class App extends React.Component {

  constructor(...args) {
    super(...args);
  }

  render() {
    return (
      <div className={'app'}>
        <Header />
        <br />
        <MovieList movies={this.retrieveMovies()}/>
      </div>
    );
  }

  retrieveMovies() {
    debugger;
    return mockData ? mockData.movieTitles : [];
  }
}
