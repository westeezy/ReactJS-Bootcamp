import './_App.scss';

import React from 'react';
import Header from '../Header/Header.solution';
import MovieList from '../MovieList/MovieList.solution';
import { getMovies } from '../../util/api';
import MoviesModel from '../../models/Movies';

let moviesModel = new MoviesModel();

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    this.reset();
  }

  render() {
    return (
      <div className="app">
        <Header search={this.search.bind(this)}
                sort={this.sort.bind(this)}
                reset={this.reset.bind(this)}/>
        <div className="main">
          <MovieList movies={this.state.movies}
                     updateRating={this.updateRating.bind(this)}/>
        </div>
      </div>
    );
  }

  search(query) {
    this.setState({
      movies: moviesModel.getBySearch(query)
    });
  }

  sort(key) {
    this.setState({
      movies: moviesModel.getSorted(key)
    });
  }

  reset() {
    moviesModel.movies = getMovies().then(movies => {
      moviesModel.movies = movies;
      this.setState({movies: moviesModel.movies})
    });
  }

  updateRating(title, rating) {
    moviesModel.updateRating(title, rating);
    this.setState({movies: moviesModel.movies});
  }
}
