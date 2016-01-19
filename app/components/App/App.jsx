'use strict';

import './_App.scss';

import React from 'react';
import MovieList from '../MovieList/MovieList';
import { getMoviesNow } from '../../util/api';
import MoviesModel from '../../models/Movies';
import Header from '../Header/Header';
import MovieTile from '../MovieTile/MovieTile';

let moviesModel = new MoviesModel();

// TODO: Render a List of Movies
//        - Which requires retrieving the movies
// TODO: Pass in sort, search, and reset methods to Header
// TODO: Refactor to use state.
export default class App extends React.Component {

  constructor(props) {
    super(props);
  }

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
    //this.setState({
    //  movies: moviesModel.getBySearch(query)
    //});
  }

  sort(key) {
    console.log(`sort ${key}`);
    //this.setState({
    //  movies: moviesModel.getSorted(key)
    //});
  }

  reset() {
    console.log('reset');
    //moviesModel.movies = getMoviesNow();
    //this.setState({movies: moviesModel.movies})
  }
}

