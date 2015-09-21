import React from 'react';
import './_MovieList.scss';
import MovieTile from '../MovieTile/MovieTile';

/*
 * 1. How do we ensure props are defaulted
   2. How do we ensure props are the right type
   3. How do we have an array of this.props.movies draw each tile
   */

// TODO: Default Props for the api call result in App.jsx
// TODO: Validate props coming in from App.jsx

export default class MovieList extends React.Component {
  constructor(props) {
      super(props);
  }

  render() {
    return (<div className="movie-list">
      <ul className="items">
        <MovieTile />
      </ul>
    </div>);
  }
}
