import React from 'react';
import '../MovieList/_MovieList.scss';
import './_MovieTile.scss';

// TODO: Add some more text and see hot reloader

export default class MovieTile extends React.Component {
  render() {
    return (
      <div className="movie-list">
        <ul className="items">
          <li className="movie-tile-container item">
            Hello From Chicago
          </li>
        </ul>
      </div>
    );
  }
}
