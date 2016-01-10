import './_App.scss';

import React from 'react';
import Header from '../Header/Header.solution';
import AppActions from '../../actions/AppActions';
import MovieStore from '../../stores/MovieStore';
import UserStore from '../../stores/UserStore';
import MovieList from '../MovieList/MovieList';

export default class App extends React.Component {

  constructor(...args) {
    super(...args);
    this.moviesUpdated = this.moviesUpdated.bind(this);
    this.userUpdated = this.userUpdated.bind(this);
    this.state = {
      movies: [],
      user: { name: 'User' }
    };
  }

  componentDidMount() {
    AppActions.fetchMovies();
    MovieStore.addChangeListener(this.moviesUpdated);
    UserStore.addChangeListener(this.userUpdated);
  }

  componentWillUnmount() {
    MovieStore.removeChangeListener(this.moviesUpdated);
    UserStore.removeChangeListener(this.userUpdated);
  }

  render() {
    return (
      <div className={'app'}>
        <Header />
        <div className="main">
          <MovieList user={this.state.user} movies={this.state.movies}/>
        </div>
      </div>
    );
  }

  moviesUpdated() {
    this.setState({
      movies: MovieStore.getAll()
    });
  }

  userUpdated() {
    this.setState({
      user: UserStore.getUser()
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
