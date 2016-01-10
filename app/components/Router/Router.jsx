/* eslint-disable react/no-did-mount-set-state */
import React from 'react';
import page from 'page';
import MovieList from '../MovieList/MovieList';
import MovieDetail from '../MovieDetail/MovieDetail';

export const Enhance = ComposedComponent => class extends React.Component {
  constructor() {
    super();
    this.state = { data: null, component: null };
  }

  componentDidMount() {
    page('/', (ctx) => {
      this.setState({
        component: MovieList,
        context: ctx
      });
    });

    page('/movies/:title', (ctx) => {
      this.setState({
        component: MovieDetail,
        context: ctx
      });
    });

    page({
      hashbang: true
    });
  }

  render() {
    return (
      <ComposedComponent {...this.props}
        component={this.state.component}
        route={this.state.context} />
    );
  }
};
