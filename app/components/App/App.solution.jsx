import React from 'react';
import Header from '../Header/Header';
import MovieTile from '../MovieTile/MovieTile';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="app">
        <Header />
        <MovieTile />
      </div>
    );
  }
}
