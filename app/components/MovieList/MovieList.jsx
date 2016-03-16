import React from 'react';
import './_MovieList.scss';
import MovieTile from '../MovieTile/MovieTile';

const MovieList = (props) => {
  return (
    <div className="movie-list">
      <h1 className="categoryHeader">Top Picks For { props.user.name }</h1>
      <ul className="items">
        {
          props.movies.map((movie, idx) => {
            return <MovieTile key={idx} movie={movie} />;
          })
        }
      </ul>
    </div>
  );
};

MovieList.deafultProps = {
  movies: []
};

MovieList.propTypes = {
  movies: React.PropTypes.array.isRequired,
  user: React.PropTypes.object.isRequired
};

export default MovieList;
