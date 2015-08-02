import React from 'react';
import MovieTile from '../MovieTile/MovieTile';

export default class MovieList extends React.Component {
  constructor(...args) {
      super(...args);
  }

  render() {
    return (<div className="movie-list">
      <ul className="items">
        {
          this.props.movies.map((movie, idx) => {
            return <MovieTile key={idx} movie={movie} rate={this.props.rate} />
          })
        }
      </ul>
    </div>);
  }
}

MovieList.deafultProps = {
  movies: [],
  rate: function() {}
};

MovieList.propTypes = {
  movies: React.PropTypes.array,
  rate: React.PropTypes.func
};
