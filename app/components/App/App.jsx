'use strict';

import './_App.scss';

import React from 'react';
import MovieList from '../MovieList/MovieList';
import { getMoviesNow } from '../../util/api';
import Header from '../Header/Header';
import MovieTile from '../MovieTile/MovieTile';

// TODO: Render a List of Movies
//        - Which requires retrieving the movies
// TODO: Pass in sort, search, and reset methods to Header

export default class App extends React.Component {

  render() {
    return (
      <div className="app">
        <Header />
        <div className="movie-list">
          <ul className="items">
            <MovieTile />
          </ul>
        </div>
      </div>
    );
  }

  search(query) {
    console.log(`search ${query}`);
  }

  sort(key) {
    console.log(`sort ${key}`);
  }

  reset() {
    console.log('reset');
  }
}

