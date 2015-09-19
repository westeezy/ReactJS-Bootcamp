import movies from '../mock/movies.json';

export default class API {
  getMovies() {
    return movies || [];
  }
}
