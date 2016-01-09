import React from 'react';
import './_MovieList.scss';
import MovieTile from '../MovieTile/MovieTile';

let MovieList = (props) => {
  return (<div className="movie-list">
    <h1 className="categoryHeader">Top Picks For User </h1>
    <MovieTile />
    <MovieTile />
    <MovieTile />
  </div>);
};

export default MovieList;
