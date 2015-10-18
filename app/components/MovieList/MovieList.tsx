import * as React from 'react';
import './MovieList.scss';
import MovieTile from '../MovieTile/MovieTile';
import {IMovieListState, IMovieListProps} from './MovieList.d.ts';

export default class MovieList extends React.Component<IMovieListProps, IMovieListState>{
  constructor(props) {
      super(props);
  }

  render() {
    return (<div className="movie-list">
      <ul className="items">
      {
        this.props.movies.map((movie, idx) => {
          return <MovieTile key={idx} movie={movie}/>;
        })
      }
      </ul>
    </div>);
  }
}
