import AppDispatcher from '../dispatcher/AppDispatcher';
import MovieModel from '../models/Movies';
import _ from 'lodash';

import {
  EventEmitter
} from 'events';

import {
  USER_UPDATED,
  USER_EDITING
} from '../constants/AppConstants';

class UserStore extends EventEmitter {
  constructor() {
    super();

    this.formField = '';
    this.user = {
      name: 'User',
      editing: false
    };
  }

  getUser() {
    return _.clone(this.user);
  }

  getFormField() {
    return _.clone(this.formField);
  }

  setEditing({showForm, name}) {
    this.user.editing = showForm;
    this.formField = name;
    this.emit(USER_UPDATED);
  }

  addChangeListener(callback) {
    this.on(USER_UPDATED, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(USER_UPDATED, callback);
  }

  changeName(user={name: this.formField}) {
    this.user = Object.assign({}, this.user, user, { editing: false });
    this.emit(USER_UPDATED);
  }
};

let store = new UserStore();

AppDispatcher.register((action) => {
  switch (action.actionType) {
    case USER_UPDATED:
      store.changeName(action.data);
      break;
    case USER_EDITING:
      store.setEditing(action.data);
      break;
    default:
  }
});

export default store;
