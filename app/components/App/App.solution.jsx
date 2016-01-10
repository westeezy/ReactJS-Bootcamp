import './_App.scss';

import React from 'react';
import Header from '../Header/Header.solution';
import MovieList from '../MovieList/MovieList.solution';
import { getMoviesNow } from '../../util/api';

export default class App extends React.Component {

  render() {
    return (
      <div className="app">
        <Header search={this.search.bind(this)}
                sort={this.sort.bind(this)}
                reset={this.reset.bind(this)}/>
        <div className="main">
          <MovieList movies={getMoviesNow()}/>
        </div>
      </div>
    );
  }

  search(query) {
    console.log(`search ${query}`);
  }

  sort(key) {
    console.log(`sort ${key}`);
  }

  reset() {
    console.log('reset');
  }
}
