import AppDispatcher from '../dispatcher/AppDispatcher';
import MovieModel from '../models/Movies';
import _ from 'lodash';

import {
  EventEmitter
} from 'events';

import {
  USER_UPDATED
} from '../constants/AppConstants';

class UserStore extends EventEmitter {
  constructor() {
    super();

    this.user = {
      name: 'User'
    };
  }

  addChangeListener(callback) {
    this.on(USER_UPDATED, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(USER_UPDATED, callback);
  }

  changeName({ name }) {
    this.user = {
      name
    };
    this.emit(USER_UPDATED);
  }

  getUser() {
    return _.clone(this.user);
  }
};

let store = new UserStore();

AppDispatcher.register((action) => {
  switch (action.actionType) {
    case USER_UPDATED:
      store.changeName(action.data);
      break;
    default:
  }
});

export default store;

