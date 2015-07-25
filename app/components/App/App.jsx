'use strict';

import './_App.scss';

import React from 'react';
import Header from '../Header/Header';
import MovieList from '../MovieList/MovieList';
import mockData from '../../mock/day0.json';

export default class App extends React.Component {

  constructor(...args) {
    super(...args);
  }

  render() {
    return (
      <div className={'app'}>
        <Header />
        <MovieList movies={this.retrieveMovies()}/>
      </div>
    );
  }

  retrieveMovies() {
    return mockData ? mockData.movieTitles : [];
  }
}
