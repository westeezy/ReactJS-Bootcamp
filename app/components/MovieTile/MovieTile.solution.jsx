
import React from 'react';
import Rating from '../Rating/Rating';
import './_MovieTile.scss';

const MovieTile = (props) => {
  let img = `img/${props.movie.cover}`;

  return (
    <li className="movie-tile-container item">
      <div className="bg-img" style={{'backgroundImage': `url('${img}')`}}></div>
      <a href="#">
        <div className="content">
          <h2>{props.movie.title}</h2>
          <Rating title={props.movie.title}
                  stars={parseInt(props.movie.rating, 10)}
                  updateRating={props.updateRating}/>
        </div>
      </a>
    </li>);
}

MovieTile.defaultProps = {
  movie: {}
};

MovieTile.propTypes = {
  movie: React.PropTypes.object
};

export default MovieTile;

