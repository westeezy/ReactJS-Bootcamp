import './_App.scss';

import React from 'react';
import Header from '../Header/Header';
import MovieList from '../MovieList/MovieList';
import AppActions from '../../actions/AppActions';
import MovieStore from '../../stores/MovieStore';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    AppActions.fetchMovies();
    MovieStore.addChangeListener(this.moviesUpdated.bind(this));
  }

  render() {
    return (
      <div className={'app'}>
        <Header />
        <div className="main">
          <Header />
          <MovieList movies={this.state.movies} />
        </div>
      </div>
    );
  }

  moviesUpdated() {
    this.setState({
      movies: MovieStore.getAll()
    });
  }
}

App.defaultProps = {
  component: {},
  context: {}
};

App.propTypes = {
  component: React.PropTypes.func,
  context: React.PropTypes.object
};
