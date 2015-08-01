'use strict';

import './_App.scss';

import React from 'react';
import _ from 'lodash';
import Header from '../Header/Header';
import MovieList from '../MovieList/MovieList';
import { getMovies } from '../../util/api';

export default class App extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    getMovies().then((movies) => {
      movies = movies.movies;
      this.setState({movies});
    });
  }

  render() {
    return (
      <div className={'app'}>
        <Header sort={this.sortMovies.bind(this)}
                search={this.searchMovies.bind(this)}/>
        <MovieList movies={this.retrieveMovies()}/>
      </div>
    );
  }

  retrieveMovies() {
    return this.state.movies || [];
  }

  searchMovies(key) {
    let searchResults = _.findWhere(this.state.movies, {title: key});
    this.setState({movies: [searchResults]});
  }

  sortMovies(key) {
    let sorted = _.sortBy(this.state.movies, (movie) => {
      if(key === 'rating') {
        return parseInt(movie[key])
      }

      return movie[key];
    });

    this.setState({movies: sorted});
  }
}
