'use strict';

import moviesJSON from '../mock/movies.json';
import _ from 'lodash';

/*
 * 1. Set up a getMoviesNow method using the MoviesModel
 */
export function getMoviesNow() {
  return moviesJSON.movies;
}

export function getMovies() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(moviesJSON.movies);
    }, 1000);
  });
}

export function searchMovies(title) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let movie = _.findWhere(moviesJSON.movies, {title});
      resolve(movie);
    }, 1000);
  });
}
