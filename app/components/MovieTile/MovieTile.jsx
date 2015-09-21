import React from 'react';
import './_MovieTile.scss';

/*
  1. Set defaultProps
  2. Set propTypes
  3. Pull in and utilize <Rating />
  4. Pass in hardcode value for rating to <Rating />
  5. Pass in value from mock data for rating to <Rating />
  6. Update Movie Img to be dynamic
*/

export default class MovieTile extends React.Component {
  constructor(...args) {
    super(...args);
  }

  render() {
    let img = `img/fake${Math.floor(Math.random() * 10) + 1}.jpg`;

    return (<li className="movie-tile-container item">
        <div className="bg-img" style={{'backgroundImage': `url('${img}')`}}></div>
        <a href="#">
          <div className="content">
            <h2>{'A Wild Movie Appears'}</h2>
            <div className="stars">
              <i className="fa fa-star" />
              <i className="fa fa-star" />
              <i className="fa fa-star" />
              <i className="fa fa-star-o" />
              <i className="fa fa-star-o" />
            </div>
          </div>
        </a>
      </li>);
  }
}
