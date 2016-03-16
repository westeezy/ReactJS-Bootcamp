import AppDispatcher from '../dispatcher/AppDispatcher';
import _ from 'lodash';

import {
  EventEmitter
} from 'events';

import {
  CART_UPDATED
} from '../constants/AppConstants';

class CartStore extends EventEmitter {
  constructor() {
    super();
    this.cart = [];
  }

  addChangeListener(callback) {
    this.on(CART_UPDATED, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CART_UPDATED, callback);
  }

  addMovie(movie) {
    this.cart.push(movie);
    this.emit(CART_UPDATED);
  }

  getMovies() {
    return _.clone(this.cart);
  }
}

const store = new CartStore();

AppDispatcher.register((action) => {
  switch (action.actionType) {
    case CART_UPDATED:
      store.addMovie(action.data);
      break;
    default:
  }
});

export default store;
