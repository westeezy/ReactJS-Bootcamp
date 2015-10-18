import * as _ from 'lodash';
import {getMoviesNow} from '../util/api.ts';
import {IMovieInterface} from '../models/Movie.d.ts';

export default class Movies {
  private _movies:Array<IMovieInterface>;

  constructor(_movies?:Array<IMovieInterface>) {
    this._movies = _movies || getMoviesNow();
  }

  get movies():Array<IMovieInterface> {
    return this._movies;
  }

  set movies(_movies:Array<IMovieInterface>) {
    this._movies = _movies;
  }

  getBySearch(title:string, moviesArray:Array<IMovieInterface>):Array<IMovieInterface> {
    let result = _.findWhere(this._movies, {
      title
    });
    return result ? [result] : [];
  }

  getSorted(key:string):Array<IMovieInterface> {
    let _movies = this.movies;
    return _.sortBy(_movies, movie => {
      if (key === 'rating') {
        return parseInt(movie[key]);
      }

      return movie[key];
    });
  }

  updateRating(title:string, rating:number):void {
    let moviesList:Array<IMovieInterface> = this.movies;
    let [movie] = this.getBySearch(title, moviesList);
    if (movie) {
      movie.rating = rating;
      this.movies = moviesList;
    }
  }
}
