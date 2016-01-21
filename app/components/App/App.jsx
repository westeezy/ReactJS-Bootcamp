'use strict';

import './_App.scss';

import React from 'react';
import Header from '../Header/Header';
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
      <div className="app">
        <Header filtered={MovieStore.isFiltered()}
                user={this.state.user}/>
        <div className="main">
          <MovieList movies={this.state.movies} user={this.state.user} />
          {
            /*
            this.props.component && this.state.movies.length ?
              <this.props.component context={this.props.context}
                                    user={this.state.user}
                                    movies={this.state.movies}/>
              :
              <div className="loader-overlay">
                <div className="loader">Loading...</div>
              </div>
              */
          }
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

// export default Enhance(App); //Note: the move of export to wrap
