'use strict';

import movies from '../mock/movies.json';
import _ from 'lodash';

export function getMovies() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(movies);
    }, 1000);
  });
}

export function searchMovies(title) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let movie = _.findWhere(movies.movies, {title});
      resolve(movie);
    }, 1000);
  });
}
