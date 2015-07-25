## Code to write for Day 1

### app.jsx

```javascript
'use strict';

import './_App.scss';

import React from 'react';
import Header from '../Header/Header';
import MovieList from '../MovieTile/MovieTile';

export default class App extends React.Component {

  constructor(...args) {
    super(...args);
  }

  render() {
    return (
      <div className={'app'}>
        <Header />
        <MovieTile />
      </div>
    );
  }
}
```

### movielist.jsx

* this will be written on day 2 but leaving just in case

```
import React from 'react';
import MovieTile from '../MovieTile/MovieTile';

export default class MovieList extends React.Component {
  constructor(...args) {
      super(...args);
      this.props = {
        movies: []
      };
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


```javascript
import React from 'react';
import _ from 'lodash';
import './_MovieTile.scss';
import {movieTitles} from '../../mocks/movieTitles.json';

const MAX_STARS = 5;

export default class MovieTile extends React.Component {
  constructor(...args) {
    super(..args);
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
            <h2>{this.retrieveTitle()}</h2>
            <div className="stars">
              {
                this.retrieveRating()
              }
            </div>
          </div>
        </a>
      </li>);
  }

  retrieveTitle(index=0) {
    return movieTitles[index];
  }

  retrieveRating() {
    return _.map(_.range(MAX_STARS), (idx) => {
      return idx < this.state.stars ?
              <i key={idx} className="fa fa-star"/>
              : <i key={idx} className="fa fa-star-o"/>;
          }.bind(this)); //TODO: why did I need to bind this.
  }
}


MovieTile.defaultProps = {
  movieTitle: 'A Wild Movie Appears'
}

MovieTile.propTypes = {
  movies: React.PropTypes.string
};
```
