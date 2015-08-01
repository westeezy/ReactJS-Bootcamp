## Code to write for Day 3

### app.jsx

```javascript
'use strict';

import './_App.scss';

import React from 'react';
import _ from 'lodash';
import Header from '../Header/Header';
import MovieList from '../MovieList/MovieList';
import { getMovies } from '../../util/api';

export default class App extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    getMovies().then((movies) => {
      movies = movies.movies;
      this.setState({movies});
    });
  }

  render() {
    return (
      <div className={'app'}>
        <Header sort={this.sortMovies.bind(this)}
                search={this.searchMovies.bind(this)}/>
        <MovieList movies={this.retrieveMovies()}/>
      </div>
    );
  }

  retrieveMovies() {
    return this.state.movies || [];
  }

  searchMovies(key) {
    let searchResults = _.findWhere(this.state.movies, {title: key});
    this.setState({movies: [searchResults]});
  }

  sortMovies(key) {
    let sorted = _.sortBy(this.state.movies, (movie) => {
      if(key === 'rating') {
        return parseInt(movie[key])
      }

      return movie[key];
    });

    this.setState({movies: sorted});
  }
}

```


### header.jsx

```javascript
import React from 'react';
import './_Header.scss';

export default class Header extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {
      searchTerm: null
    };
  }

  render() {

    var searchBox;
    if (this.state.searchTerm) {
      searchBox = (
        <h3 className="term">
          {this.state.searchTerm} <a href='#'><i className="fa fa-times"/></a>
        </h3>
      );
    }
    else {
      searchBox = (
        <form className="search-form" onSubmit={this.search.bind(this)}>
          <input ref="searchBox" className="search-input" type="text" placeholder="Search" />
        </form>
      );
    }

    return (
      <header className="app-header">
        <div className="inner">
          <h1 className="title">FakeFlix</h1>
          <div className="header-right">
            {searchBox}
            <select className="display-select"
                    onChange={this.sort.bind(this)}>
              <option>View By:</option>
              <option value="title">Title</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>
      </header>
    );
  }

  search(e) {
    e.preventDefault();
    //this is not efficient but for day 3 this is what we will be doing
    //fixing on day 4
    let searchTerm = this.refs.searchBox.getDOMNode().value;
    this.setState({searchTerm});
    this.props.search(searchTerm); //can't use state because its async
  }

  sort(e) {
    //this does not properly sort by user selected rating so we talk about that limitation and fix
    //on day 4
    this.props.sort(e.target.value);
  }

}

Header.defaultProps = {
  sort: function() {},
  search: function() {}
}

```


### movielist.jsx

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
          this.props.movies.map((movie, idx) => {
            return <MovieTile key={idx} movie={movie} />
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

const MAX_STARS = 5;

export default class MovieTile extends React.Component {
  constructor(props, ...args) {
    super(props, ...args);
    this.state = {
      stars: _.get(props, 'movie.rating', 0)
    };
    this.retrieveRating.bind(this);
  }

  render() {
    return (<li className="movie-tile-container item">
    		<div className="bg-img" 
             style={{'backgroundImage': `url('img/${this.props.movie.cover}')`}}></div>
        <a href="#">
    			<div className="content">
    				<h2>{this.props.movie.title}</h2>
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
          });
  }

  updateRating(e) {
    let stars = parseInt(e.target.attributes['data-rating'].value) + 1;
    this.setState({stars});
  }
}


MovieTile.defaultProps = {
  movie: {}
}

MovieTile.propTypes = {
  movies: React.PropTypes.string
};

```
