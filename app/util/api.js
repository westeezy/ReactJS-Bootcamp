'use strict';

import movies from '../mock/movies.json';

export function getMovies() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(movies);
    }, 1000);
  });
}
