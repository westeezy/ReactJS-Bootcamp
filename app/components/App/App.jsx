'use strict';

import './_App.scss';

import React from 'react';
import { Enhance } from '../Router/Router';
import Header from '../Header/Header';
import AppActions from '../../actions/AppActions';
import MovieStore from '../../stores/MovieStore';

class App extends React.Component {

  constructor(...args) {
    super(...args);
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
        {
          this.props.component && this.state.movies.length ?
            <this.props.component context={this.props.context}
                                  movies={this.state.movies}/>
            :
            <div className="loader-overlay">
              <div className="loader">Loading...</div>
            </div>
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
}

App.defaultProps = {
  component: {},
  context: {}
};

App.propTypes = {
  component: React.PropTypes.object,
  context: React.PropTypes.object
};

export default Enhance(App); //Note: the move of export to wrap
