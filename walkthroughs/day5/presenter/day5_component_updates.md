## Code to write for Day 5 (2/2)

### app.jsx

* could include the Movies on MovieList instead. talk pros and cons
* componentDidMount vs componentWillMount
* action namings

```javascript
'use strict';

import './_App.scss';

import React from 'react';
import _ from 'lodash';
import Header from '../Header/Header';
import MovieList from '../MovieList/MovieList';
import AppActions from '../../actions/AppActions';
import MovieStore from '../../stores/MovieStore';

export default class App extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {
      movies: []
    };
  }

  componentDidMount() {
    AppActions.fetchMovies();
    MovieStore.addChangeListener(this.moviesUpdated.bind(this))
  }

  render() {
    return (
      <div className={'app'}>
        <Header />
        <MovieList movies={this.state.movies} />
      </div>
    );
  }

  moviesUpdated() {
    this.setState({
      movies: MovieStore.getAll()
    });
  }
}

```

### header.jsx

```javascript
import React from 'react';
import './_Header.scss';
import AppActions from '../../actions/AppActions';

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
    AppActions.searchMovie(this.state.searchTerm);
    this.setState({submitted: true});
  }

  sort(e) {
    AppActions.sortMovies(e.target.value);
  }

  reset() {
    AppActions.fetchMovies();
    this.setState({submitted: false, searchTerm: undefined});
  }

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
import AppActions from '../../actions/AppActions';

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
    AppActions.rateMovie(this.props.movie.title, stars);
  }
}


MovieTile.defaultProps = {
  movie: {}
}

MovieTile.propTypes = {
  movie: React.PropTypes.object
};
```