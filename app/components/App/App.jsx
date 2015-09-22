'use strict';

import './_App.scss';

import React from 'react';
import Header from '../Header/Header';
import MovieList from '../MovieList/MovieList';
import movies from '../../mock/movies.json';

/*
 * 1. Fetch Movies from API in proper lifecycle method
 * 2. Set up search and sort for Header.jsx
 */

export default class App extends React.Component {

  constructor(...args) {
    super(...args);
  }

  render() {
    return (
      <div className={'app'}>
        <Header search={this.search.bind(this)}
                sort={this.sort.bind(this)}
                reset={this.reset.bind(this)}/>
        <div className="main">
          <MovieList movies={movies.movies}/>
        </div>
      </div>
    );
  }

  search(query) {
    console.log('search');
  }

  sort(key) {
    console.log('sort');
  }

  reset() {
    console.log('reset');
  }
}
