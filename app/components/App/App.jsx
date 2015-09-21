'use strict';

import './_App.scss';

import React from 'react';
import Header from '../Header/Header';
import MovieList from '../MovieList/MovieList';

/*
  1. Build MovieList and Wire up MovieList Wrapper for MovieTiles
  2. Wire up retrieveMovies api - have the group help with that
  3. Retrieve the movies in the proper lifecycle method
  4. Wire up search to Header and setMovie
  5. What is wrong with forceUpdate? Hint: lots of things
 */

export default class App extends React.Component {

  constructor(...args) {
    super(...args);
  }

  render() {
    return (
      <div className={'app'}>
        <Header />
        <MovieList />
      </div>
    );
  }
}
