import React from 'react';
import '../MovieList/_MovieList.scss';
import './_MovieTile.scss';

export default class MovieTile extends React.Component {
  constructor(...args) {
    super(...args);
  }

  render() {
    let img = `img/fake${Math.floor(Math.random() * 10) + 1}.jpg`;
    return (
      <div className="movie-list">
        <ul className="items">
          <li className="movie-tile-container item">
            <div className="bg-img" style={{backgroundImage: `url('${img}')`}} />
          </li>
        </ul>
      </div>
    );
  }
}
