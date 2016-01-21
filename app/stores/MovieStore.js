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
    this.filtered = false;
  }

  getAll() {
    return this.movieModel.movies || [];
  }

  isFiltered() {
    return this.filtered;
  }

  getByTitle(title) {
    return _.findWhere(this.getAll(), {title});
  }

  populate(movies) {
    this.movieModel.movies = movies;
    this.filtered = false;
    this.emitChange();
  }

  filter(movies) {
    this.movieModel.movies = movies;
    this.filtered = true;
    this.emitChange();
  }

  sort(key) {
    this.populate(this.movieModel.getSorted(key));
  }

  rate(title, rating) {
    this.movieModel.updateRating(title, rating);
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
      store.populate(action.data.movies);
      break;
    case FIND_MOVIE_GET_SUCCESS:
      store.filter(action.data);
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
