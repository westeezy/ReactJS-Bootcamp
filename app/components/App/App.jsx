import './_App.scss';

import React from 'react';
import Header from '../Header/Header';
import AppActions from '../../actions/AppActions';
import MovieStore from '../../stores/MovieStore';
import UserStore from '../../stores/UserStore';
import { Enhance } from '../Router/Router';
import CartStore from '../../stores/CartStore';

class App extends React.Component {

  constructor(...args) {
    super(...args);
    this.moviesUpdated = this.moviesUpdated.bind(this);
    this.userUpdated = this.userUpdated.bind(this);
    this.cartUpdated = this.cartUpdated.bind(this);
    this.state = {
      movies: [],
      user: UserStore.getUser(),
      cart: []
    };
  }

  componentDidMount() {
    AppActions.fetchMovies();
    MovieStore.addChangeListener(this.moviesUpdated);
    UserStore.addChangeListener(this.userUpdated);
    CartStore.addChangeListener(this.cartUpdated);
  }

  componentWillUnmount() {
    MovieStore.removeChangeListener(this.moviesUpdated);
    UserStore.removeChangeListener(this.userUpdated);
    CartStore.removeChangeListener(this.cartUpdated);
  }

  cartUpdated() {
    this.setState({
      cart: CartStore.getMovies()
    });
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
          router={this.props.route}
          cartCount={this.state.cart.length} />
        <div className="main">
          {
            this.props.component && this.state.movies.length ?
              <this.props.component route={this.props.route}
                cart={this.state.cart}
                user={this.state.user}
                movies={this.state.movies} />
              : <div className="loader-overlay">
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
