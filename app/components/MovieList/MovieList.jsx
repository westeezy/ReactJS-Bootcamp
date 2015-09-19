import React from 'react';
import MovieTile from '../MovieTile/MovieTile';
import './_MovieList.scss';

export default class MovieList extends React.Component {
  constructor(...args) {
      super(...args);
  }

  render() {
    return (<div className="movie-list">
      <ul className="items">
        {
          this.props.movies.map((movieTitle, idx) => {
            return <MovieTile key={idx} movieTitle={movieTitle} />
          })
        }
      </ul>
    </div>);
  }
}

MovieList.deafultProps = {
  movies: []
};

MovieList.propTypes = {
  movies: React.PropTypes.array
};
