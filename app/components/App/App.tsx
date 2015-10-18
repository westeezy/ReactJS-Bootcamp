import * as React from 'react';
import Header from '../Header/Header.tsx';
import MovieList from '../MovieList/MovieList.tsx';
import AppActions from '../../actions/AppActions';
import MovieStore from '../../stores/MovieStore';

import {IAppState, IAppProps} from './App.d.ts';

export default class App extends React.Component<IAppProps, IAppState> {

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

  public render() {
    return (
      <div className="app" style={{'color': '#fff'}}>
        <Header />
        <div className="main">
          {
            this.state.movies && this.state.movies.length ?
              <MovieList movies={this.state.movies} />
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
