import React from 'react';
import MovieTile from '../MovieTile/MovieTile';
import './_MovieList.scss';

/*
 * 1. How do we ensure props are defaulted
   2. How do we ensure props are the right type
   3. How do we have an array of this.props.movies draw each tile
 */

export default class MovieList extends React.Component {
  constructor(...args) {
      super(...args);
  }

  render() {
    return (<div className="movie-list">
      <ul className="items">
        <MovieTile />
      </ul>
    </div>);
  }
}
