import React from 'react';
import './_MovieList.scss';
import MovieTile from '../MovieTile/MovieTile';

let MovieList = (props) => {
  return (<div className="movie-list">
    <ul className="items">
      {
        props.movies.map((movie, idx) => {
          return <MovieTile key={idx} movie={movie} />;
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
