## Code to write for Day 2

### app.jsx

* added in mock data call and passed down as prop

```javascript
'use strict';

import './_App.scss';

import React from 'react';
import Header from '../Header/Header';
import MovieList from '../MovieList/MovieList';
import mockData from '../../mock/day0.json';

export default class App extends React.Component {

  constructor(...args) {
    super(...args);
  }

  render() {
    return (
      <div className={'app'}>
        <Header />
        <MovieList movies={this.retrieveMovies()}/>
      </div>
    );
  }

  retrieveMovies() {
    return mockData ? mockData.movieTitles : [];
  }
}

```

### movielist.jsx

* freshly created

```javascript
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
          this.props.movies.map((movieTitle, idx) => {
            return <MovieTile key={idx} movieTitle={movieTitle} />
          })
        }
      </ul>
    </div>);
  }
}

MovieList.deafultProps = {
  movies: []
};

MovieList.propTypes = {
  movies: React.PropTypes.array
};

```

### movietile.jsx

* talk about how refactoring stars into its own component can cleaner logical flow
* talk about how stars doesn't change upwards in the stack to app.jsx which may have reprocussions day 3 during sorting.

```javascript
import React from 'react';
import _ from 'lodash';
import './_MovieTile.scss';

const MAX_STARS = 5;

export default class MovieTile extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      stars: (Math.floor(Math.random() * 5) + 1)
    };
    this.retrieveRating.bind(this);
  }

  render() {
    let img = `img/fake${Math.floor(Math.random() * 10) + 1}.jpg`;

    return (<li className="movie-tile-container item">
        <div className="bg-img" style={{'backgroundImage': `url('${img}')`}}></div>
        <a href="#">
          <div className="content">
            <h2>{this.props.movieTitle}</h2>
            <div className="stars">
              {
                this.retrieveRating()
              }
            </div>
          </div>
        </a>
      </li>);
  }

  retrieveRating() {
    return _.map(_.range(MAX_STARS), (idx) => {
      return idx < this.state.stars ?
              <i key={idx} className="fa fa-star"
                           data-rating={idx}
                           onClick={this.updateRating.bind(this)}/>
              :
              <i key={idx} className="fa fa-star-o"
                           data-rating={idx}
                           onClick={this.updateRating.bind(this)}/>;
          }.bind(this));
  }

  updateRating(e) {
    let stars = parseInt(e.target.attributes['data-rating'].value) + 1;
    this.setState({stars});
  }
}


MovieTile.defaultProps = {
  movieTitle: 'A Wild Movie Appears'
}

MovieTile.propTypes = {
  moviesTitle React.PropTypes.string
};

````
