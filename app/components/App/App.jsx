import './_App.scss';

import React from 'react';
import Header from '../Header/Header';
import MovieList from '../MovieList/MovieList';

// TODO: Build a MovieList Wrapper for MovieTile
// TODO: Pass Movies into the MovieList Wrapper from the util/api using proper lifecycle methods
// TODO: Wire up search method to pass to the Header

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

