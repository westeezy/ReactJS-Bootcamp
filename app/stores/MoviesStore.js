import BaseStore from './BaseStore';
import AppDispatcher from '../dispatcher/AppDispatcher';
import MoviesModel from '../models/Movies';


import {
    MOVIES_GET_SUCCESS,
    MOVIES_UPDATED
}
from '../constants/AppConstants';
class ItemsStore {

	constructor() {
		this.movieModel =  new MoviesModel();
	}

	set(movies) {
		this.moviesModel.movies = movies;
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

let store = new ItemsStore();

AppDispatcher.register((action) => {
    switch (action.actionType) {
        case MOVIES_GET_SUCCESS:
            store.set(action.movies);
            break;
        default:
    }
});
export default store;