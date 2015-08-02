## Code to write for day 4


### app.jsx


```javascript
'use strict';

import './_App.scss';

import React from 'react';
import _ from 'lodash';
import Header from '../Header/Header';
import MovieList from '../MovieList/MovieList';
import MoviesModel from '../../models/movies';
import { getMovies } from '../../util/api';

export default class App extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {
      movies: []
    };
    this.moviesModel = new MoviesModel();
  }

  componentDidMount() {
    getMovies().then((movies) => {
      this.moviesModel.movies = movies.movies;
      this.setState({movies:this.moviesModel.movies});
    });
  }

  render() {
    return (
      <div className={'app'}>
        <Header sort={this.sortMovies.bind(this)}
                search={this.searchMovies.bind(this)}
                reset={this.reset.bind(this)}/>
        <MovieList movies={this.retrieveMovies()}
                   rate={this.rateMovie.bind(this)}/>
      </div>
    );
  }

  retrieveMovies() {
    return this.state.movies || [];
  }

  reset() {
    this.setState({movies: this.moviesModel.movies});
  }

  searchMovies(key) {
    let searchResult = this.moviesModel.getBySearch(key);
    this.setState({movies: searchResult});
  }

  sortMovies(key) {
    let sorted = this.moviesModel.getSorted(key);
    this.setState({movies: sorted});
  }

  rateMovie(...args) {
    this.moviesModel.updateRating(...args);
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
      searchTerm: null,
      submitted: false
    };
  }

  render() {

    var searchBox;
    if (this.state.submitted) {
      searchBox = (
        <h3 className="term">
          {this.state.searchTerm}
          <a href='#'>
            <i className="fa fa-times"
                onClick={this.reset.bind(this)}/>
          </a>
        </h3>
      );
    }
    else {
      searchBox = (
        <form className="search-form" onSubmit={this.search.bind(this)}>
          <input ref="searchBox"
                 className="search-input"
                 type="text"
                 placeholder="Search"
                 value={this.state.searchTerm}
                 onChange={this.updateSearchTerm.bind(this)}/>
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

  updateSearchTerm(e) {
    let searchTerm = e.target.value;
    this.setState({searchTerm});
  }

  search(e) {
    e.preventDefault();
    this.props.search(this.state.searchTerm);
    this.setState({submitted: true});
  }

  sort(e) {
    this.props.sort(e.target.value);
  }

  reset() {
    this.props.reset();
    this.setState({submitted: false, searchTerm: undefined});
  }

}

Header.defaultProps = {
  sort: function() {},
  search: function() {},
  reset: function() {}
}



Header.propTypes = {
  sort: React.PropTypes.func,
  search: React.PropTypes.func,
  reset: React.PropTypes.func
};

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
            return <MovieTile key={idx} movie={movie} rate={this.props.rate} />
          })
        }
      </ul>
    </div>);
  }
}

MovieList.deafultProps = {
  movies: [],
  rate: function() {}
};

MovieList.propTypes = {
  movies: React.PropTypes.array,
  rate: React.PropTypes.func
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
    this.props.rate(this.props.movie.title, stars);
  }
}


MovieTile.defaultProps = {
  movie: {},
  rate: function() {}
}

MovieTile.propTypes = {
  movies: React.PropTypes.string,
  rate: React.PropTypes.func
};

```

### models/movies.js

```javascript
import _ from 'lodash';

/*
 * Could clean this up to be export new MoviesModel() instead and then just
 * use it as a singleton but for the purpose of demo we are not yet
 */

export default class movies {
	//no constructor on purpose 

	get movies() {
		return _.clone(this._movies);
	}

	set movies(movies) { //only way to modify movies
						 // could have used Symbols trick as well
		this._movies = movies;
	}

	getSorted(key) {
		let movies = this.movies;
		return _.sortBy(movies, (movie) => {
	      if(key === 'rating') {
	        return parseInt(movie[key])
	      }

	      return movie[key];
	    });
	}

	getBySearch(title, moviesArray) {
		let movies = moviesArray || this.movies;
		let result = _.findWhere(movies, {title});
		return result ? [result] : [];
	}

	updateRating(title, rating) {
		let moviesList = this.movies;
		let [movie] = this.getBySearch(title, moviesList);
		if(movie) {
			movie.rating = '' + rating;
			this.movies = moviesList;
		}
	}
}
```

