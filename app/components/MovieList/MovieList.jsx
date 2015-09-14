import React from 'react';
import './_MovieList.scss';
import MovieTile from '../MovieTile/MovieTile';

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
