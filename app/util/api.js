import movies from '../mock/movies.json';
import _ from 'lodash';

export function getMovies() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(movies);
    }, 500);
  });
}

export function searchMovies(title) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const movie = _.find(movies.movies, { title });
      resolve(movie);
    }, 0);
  });
}
