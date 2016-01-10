'use strict';

import './_App.scss';

import React from 'react';
import MovieList from '../MovieList/MovieList';
import { getMoviesNow, getMovies } from '../../util/api';
import MoviesModel from '../../models/Movies';
import Header from '../Header/Header';

let moviesModel = new MoviesModel();

// TODO: Refactor to use state and async getMovies
// TODO: Wire in Header methods
// TODO: Figure out how to update Ratings on Movie

export default class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="app">
        <Header search={this.search.bind(this)}
                sort={this.sort.bind(this)}
                reset={this.reset.bind(this)}/>
        <MovieList movies={getMoviesNow()} />
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
    //moviesModel.movies = getMovies().then(movies => {
    //  moviesModel.movies = movies;
    //  this.setState({movies: moviesModel.movies})
    //});
  }

  updateRating(title, rating) {
    console.log(title, rating);
    //moviesModel.updateRating(title, rating);
    //this.setState({movies: moviesModel.movies});
  }
}

