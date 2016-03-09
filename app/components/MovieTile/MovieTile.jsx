import React from 'react';
import _ from 'lodash';
import './_MovieTile.scss';
import Rating from '../Rating/Rating';

const MovieTile = (props) =>
  (<li className="movie-tile-container item">
      <div
        className="bg-img"
        style={{ backgroundImage: `url('img/${props.movie.cover}')` }}></div>
      <a href={`/movies/${props.movie.title}`}>
        <div className="content">
          <h2>{props.movie.title}</h2>
          <Rating
            stars={parseInt(_.get(props, 'movie.rating', 0))}
            title={_.get(props, 'movie.title')} />
        </div>
      </a>
    </li>);

MovieTile.defaultProps = {
  movie: {}
};

MovieTile.propTypes = {
  movie: React.PropTypes.object
};

export default MovieTile;
