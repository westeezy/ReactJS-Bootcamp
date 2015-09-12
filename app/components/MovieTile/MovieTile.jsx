import React from 'react';
import '../MovieList/_MovieList.scss';
import './_MovieTile.scss';

export default class MovieTile extends React.Component {
  constructor(...args) {
    super(...args);
  }

  render() {
    return (
      <div className="movie-list">
        <ul className="items">
          <li className="movie-tile-container item">
            hello
          </li>
        </ul>
      </div>
    );
  }
}
