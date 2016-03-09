import React from 'react';
import './_MovieList.scss';
import MovieTile from '../MovieTile/MovieTile';

const MovieList = (props) =>
  (<div className="movie-list">
    <h1 className="categoryHeader">Top Picks For { props.user.name }</h1>
    <ul className="items">
      {
        props.movies.map((movie, idx) => <MovieTile key={idx} movie={movie} />)
      }
    </ul>
  </div>);

MovieList.deafultProps = {
  movies: []
};

MovieList.propTypes = {
  movies: React.PropTypes.array,
  user: React.PropTypes.object
};

export default MovieList;
