import AppDispatcher from '../dispatcher/AppDispatcher';
import {getMovies, searchMovies} from '../util/api';
import {
  MOVIES_GET_SUCCESS,
  FIND_MOVIE_GET_SUCCESS,
  SORT_MOVIES_BY_KEY,
  RATE_MOVIE
} from '../constants/AppConstants';

export default {
  fetchMovies():void {
      getMovies().then((movies) => {
        AppDispatcher.dispatch({
          data: movies,
          actionType: MOVIES_GET_SUCCESS
        });
      });
    },

    searchMovie(title:string):void {
      searchMovies(title).then((movie) => {
        AppDispatcher.dispatch({
          data: [movie],
          actionType: FIND_MOVIE_GET_SUCCESS
        });
      });
    },

    sortMovies(key:string):void {
      AppDispatcher.dispatch({
        data: key,
        actionType: SORT_MOVIES_BY_KEY
      });
    },

    rateMovie(title:string, rating:number):void {
      AppDispatcher.dispatch({
        data: {
          title, rating
        },
        actionType: RATE_MOVIE
      });
    }

};
