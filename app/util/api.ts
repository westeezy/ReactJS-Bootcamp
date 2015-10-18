import * as _ from 'lodash';
import getAllMovies from '../mock/movies.ts';
import {IMovieInterface} from '../models/Movie.d.ts';

//API is a simple wrapper for now.
//TODO: add fake promise logic
export function getMoviesNow(): Array<IMovieInterface> {
  return getAllMovies();
}

export function getMovies():any {
  return new Promise<Array<IMovieInterface>>( resolve => {
    setTimeout(() => {
      resolve(getAllMovies());
    }, 1000);
  });
}

export function searchMovies(title):any {
  return new Promise<IMovieInterface>( resolve => {
    setTimeout(() => {
      let movie = _.findWhere(getAllMovies(), {title});
      resolve(movie);
    }, 200);
  });
}
