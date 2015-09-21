import './_App.scss';

import React from 'react';
import Header from '../Header/Header';
import MovieList from '../MovieList/MovieList';
import api from '../../utils/api';
import _ from 'lodash';


let MoviesApi = new api();

export default class App extends React.Component {

  constructor(...args) {
    super(...args);
    this.movies = this.retrieveMovies();
    this.currentMovie = null;
  }

  render() {
    let currentMovie = this.currentMovie ? [this.currentMovie] : null;
    return (
      <div className={'app'}>
        <Header search={this.setMovie.bind(this)} />
        <MovieList movies={currentMovie || this.movies}/>
      </div>
    );
  }

  setMovie(query) {
    this.currentMovie = _.findWhere(this.movies, {title: query});
    this.forceUpdate(); //terrible don't do this
  }

  retrieveMovies() {
    return MoviesApi.getMovies().movies;
  }
}
