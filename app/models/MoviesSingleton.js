//TODO: create for demo purposes
// wait until movie model is finalized though

import _ from 'lodash';

/*
 * Could clean this up to be export new MoviesModel() instead and then just
 * use it as a singleton but for the purpose of demo we are not yet
 */

let MovieModel = class movies {
  //no constructor on purpose

  get movies() {
    return _.clone(this._movies);
  }

  set movies(_movies) { //only way to modify movies
    // could have used Symbols trick as well
    this._movies = _movies;
  }

  getSorted(key) {
    let _movies = this.movies;
    return _.sortBy(_movies, (movie) => {
      if (key === 'rating') {
        return parseInt(movie[key]);
      }

      return movie[key];
    });
  }

  getBySearch(title, moviesArray) {
    let _movies = moviesArray || this.movies;
    let result = _.findWhere(_movies, {
      title
    });
    return result ? [result] : [];
  }

  updateRating(title, rating) {
    let moviesList = this.movies;
    let [movie] = this.getBySearch(title, moviesList);
    if (movie) {
      movie.rating = '' + rating;
      this.movies = moviesList;
    }
  }
};

export default new MovieModel();
