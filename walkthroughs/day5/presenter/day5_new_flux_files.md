## Code to write for Day 5 (1/2)

### actions/AppActions.js

```javascript
import AppDispatcher from '../dispatcher/AppDispatcher';
import {
  getMovies, searchMovies
}
from '../util/api';
import {
  MOVIES_GET_SUCCESS,
  FIND_MOVIE_GET_SUCCESS,
  SORT_MOVIES_BY_KEY,
  RATE_MOVIE
}
from '../constants/AppConstants';

export default {

  fetchMovies() {
      getMovies().then((movies) => {
        AppDispatcher.dispatch({
          data: movies,
          actionType: MOVIES_GET_SUCCESS
        });
      });
    },

    searchMovie(title) {
      searchMovies(title).then((movie) => {
        AppDispatcher.dispatch({
          data: [movie],
          actionType: FIND_MOVIE_GET_SUCCESS
        })
      });
    },

    sortMovies(key) {
      AppDispatcher.dispatch({
        data: key,
        actionType: SORT_MOVIES_BY_KEY
      })
    },

    rateMovie(title, rating) {
      AppDispatcher.dispatch({
        data: {
          title, rating
        },
        actionType: RATE_MOVIE
      })
    }

};
```

### constants/AppConstants.js

```javascript
export const MOVIES_GET_SUCCESS = 'ITEMS_GET_SUCCESS';
export const MOVIES_GET_ERROR = 'ITEMS_GET_ERROR';
export const MOVIES_UPDATED = 'ITEMS_UPDATED';
export const FIND_MOVIE_GET_SUCESS = 'FIND_MOVIE_GET_SUCESS';
export const SORT_MOVIES_BY_KEY = 'SORT_MOVIES_BY_KEY';
export const RATE_MOVIE = 'RATE_MOVIE';
```

### dispatcher/AppDispatcher.js

```javascript
import Flux from 'flux';

export default new Flux.Dispatcher();
```

### stores/MovieStore.js

```javascript
import AppDispatcher from '../dispatcher/AppDispatcher';
import MovieModel from '../models/Movies';
import {
  EventEmitter
}
from 'events';

import {
  MOVIES_GET_SUCCESS,
  FIND_MOVIE_GET_SUCCESS,
  SORT_MOVIES_BY_KEY,
  RATE_MOVIE,
  MOVIES_UPDATED
}
from '../constants/AppConstants';

class MovieStore extends EventEmitter {

  constructor() {
    super();
    this.movieModel = new MovieModel();
  }

  getAll() {
    return this.movieModel.movies || [];
  }

  set(movies) {
    this.movieModel.movies = movies;
    this.emitChange();
  }

  sort(key) {
    this.set(this.movieModel.getSorted(key));
  }

  rate(title, rating) {
    this.movieModel.updateRating(title, rating);
    //no need to trigger an event as the UI updates and can let this lazily
    //happen on full refresh
  }

  emitChange() {
    this.emit(MOVIES_UPDATED);
  }

  addChangeListener(callback) {
    this.on(MOVIES_UPDATED, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(MOVIES_UPDATED, callback);
  }
}

let store = new MovieStore();

AppDispatcher.register((action) => {
  switch (action.actionType) {
    case MOVIES_GET_SUCCESS:
      store.set(action.data.movies);
      break;
    case FIND_MOVIE_GET_SUCCESS:
      store.set(action.data);
      break;
    case SORT_MOVIES_BY_KEY:
      store.sort(action.data);
      break;
    case RATE_MOVIE:
      store.rate(action.data.title, action.data.rating)
      break;
    default:
  }
});
export default store;
```

### models/movies.js

```javascript
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
      if (key === 'rating') {
        return parseInt(movie[key])
      }

      return movie[key];
    });
  }

  getBySearch(title, moviesArray) {
    let movies = moviesArray || this.movies;
    let result = _.find(movies, {
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
}
```


### utils/api.js

```javascript
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
      let movie = _.find(movies.movies, {title})
      resolve(movie)
    }, 1000);
  });
}
```

