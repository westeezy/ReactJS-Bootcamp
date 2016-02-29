import AppDispatcher from '../dispatcher/AppDispatcher';
import MovieModel from '../models/Movies';
import _ from 'lodash';

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

  getByTitle(title) { // TODO: move this to model
    return _.findWhere(this.getAll(), { title });
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
    // no need to trigger an event as the UI updates and can let this lazily
    // happen on full refresh
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

const store = new MovieStore();

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
      store.rate(action.data.title, action.data.rating);
      break;
    default:
  }
});
export default store;
