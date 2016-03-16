import _ from 'lodash';

/*
 * Could clean this up to be export new MoviesModel() instead and then just
 * use it as a singleton but for the purpose of demo we are not yet
 */

export default class movies {
  // no constructor on purpose

  get movies() {
    return _.clone(this._movies);
  }

  set movies(_movies) { // only way to modify movies
    // could have used Symbols trick as well
    this._movies = _movies;
  }

  getSorted(key) {
    const _movies = this.movies;
    return _.sortBy(_movies, (movie) => {
      if (key === 'rating') {
        return parseInt(movie[key]);
      }

      return movie[key];
    });
  }

  getBySearch(title, moviesArray) {
    const _movies = moviesArray || this.movies;
    const result = _.find(_movies, {
      title
    });
    return result ? [result] : [];
  }

  updateRating(title, rating) {
    const moviesList = this.movies;
    const [movie] = this.getBySearch(title, moviesList);
    if (movie) {
      movie.rating = `${rating}`;
      this.movies = moviesList;
    }
  }
}
