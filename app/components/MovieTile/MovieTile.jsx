import React from 'react';
import Rating from '../Rating/Rating';
import './_MovieTile.scss';

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
          <h2>{this.props.movie.title}</h2>
          <Rating score={this.props.movie.rating} />
        </div>
      </a>
    </li>);
 }
}

MovieTile.defaultProps = {
  movie: {}
};

MovieTile.propTypes = {
  movie: React.PropTypes.object
};
