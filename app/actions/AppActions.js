import AppDispatcher from '../dispatcher/AppDispatcher';
import WebAPI from '../util/api';
import { MOVIES_GET_SUCCESS } from '../constants/AppConstants';

export default {

  getMovies() {
    WebAPI.getMovies().then((movies) => {
      AppDispatcher.dispatch({
      	movies,
        actionType: MOVIES_GET_SUCCESS
      });
    });
  }

};
