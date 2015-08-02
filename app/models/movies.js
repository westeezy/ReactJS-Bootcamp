import _ from 'lodash';

/*
 * Could clean this up to be export new MoviesModel() instead and then just
 * use it as a singleton but for the purpose of demo we are not yet
 */

export default class movies {
	//no constructor on purpose 

	get movies() {
		return _.clone(this._movies);
	}

	set movies(movies) { //only way to modify movies
						 // could have used Symbols trick as well
		this._movies = movies;
	}

	getSorted(key) {
		let movies = this.movies;
		return _.sortBy(movies, (movie) => {
	      if(key === 'rating') {
	        return parseInt(movie[key])
	      }

	      return movie[key];
	    });
	}

	getBySearch(title, moviesArray) {
		let movies = moviesArray || this.movies;
		let result = _.findWhere(movies, {title});
		return result ? [result] : [];
	}

	updateRating(title, rating) {
		let moviesList = this.movies;
		let [movie] = this.getBySearch(title, moviesList);
		if(movie) {
			movie.rating = '' + rating;
			this.movies = moviesList;
		}
	}
}