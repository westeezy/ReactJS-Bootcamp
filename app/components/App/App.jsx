import './_App.scss';

import React from 'react';
import Header from '../Header/Header';
import AppActions from '../../actions/AppActions';
import MovieStore from '../../stores/MovieStore';
import UserStore from '../../stores/UserStore';
import { Enhance } from '../Router/Router';

class App extends React.Component {

  constructor(...args) {
    super(...args);
    this.moviesUpdated = this.moviesUpdated.bind(this);
    this.userUpdated = this.userUpdated.bind(this);
    this.state = {
      movies: [],
      user: UserStore.getUser()
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

  render() {
    return (
      <div className="app">
        <Header filtered={MovieStore.isFiltered()}
          user={this.state.user}
          router={this.props.route} />
        <div className="main">
          {

            this.props.component && this.state.movies.length ?
              <this.props.component route={this.props.route}
                user={this.state.user}
                movies={this.state.movies} />
              :
                <div className="loader-overlay">
                  <div className="loader">Loading...</div>
                </div>

                }
              </div>
            </div>
    );
  }
}

App.defaultProps = {
  component: {},
  route: {}
};

App.propTypes = {
  component: React.PropTypes.func,
  route: React.PropTypes.object
};

export default Enhance(App); // Note: the move of export to wrap
