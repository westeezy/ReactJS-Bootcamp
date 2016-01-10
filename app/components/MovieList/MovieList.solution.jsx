import React from 'react';
import MovieTile from '../MovieTile/MovieTile.solution';
import './_MovieList.scss';

const MovieList = (props) => {
  return (
    <div className="movie-list">
      <ul className="items">
        {
          props.movies.map((movie, idx) => {
            return <MovieTile key={idx} movie={movie} updateRating={props.updateRating}/>;
          })
        }
      </ul>
    </div>);
};

MovieList.defaultProps = {
  movies: []
};

MovieList.propTypes = {
  movies: React.PropTypes.array
};

export default MovieList;
