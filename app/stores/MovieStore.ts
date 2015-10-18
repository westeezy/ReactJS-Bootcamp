import AppDispatcher from '../dispatcher/AppDispatcher';
import MovieModel from '../models/Movies';
import {IMovieInterface} from '../models/Movie.d.ts';
import {IAppActionInterface} from '../actions/AppActions.d.ts';
import * as _ from 'lodash';

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
  private movieModel;

  constructor() {
    super();
    this.movieModel = new MovieModel();
  }

  getAll() {
    return this.movieModel.movies || [];
  }

  getByTitle(title:string) { //TODO: move this to model
    return _.findWhere(this.getAll(), {title});
  }

  set(movies:Array<IMovieInterface>) {
    this.movieModel.movies = movies;
    this.emitChange();
  }

  sort(key:string) {
    this.set(this.movieModel.getSorted(key));
  }

  rate(title:string, rating:number) {
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

//TODO: create typings for the actions
AppDispatcher.register((action:IAppActionInterface) => {
  switch (action.actionType) {
    case MOVIES_GET_SUCCESS:
      store.set(action.data);
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
