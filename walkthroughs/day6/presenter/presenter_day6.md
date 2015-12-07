## Code to write for Day 6

### components/Router/Router.jsx

```javascript
import React from 'react';
import page from 'page';
import MovieList from '../MovieList/MovieList';
import MovieDetail from '../MovieDetail/MovieDetail';

export var Enhance = ComposedComponent => class extends React.Component {
  constructor() {
    super();
    this.state = { data: null, component: null };
  }

  componentDidMount() {
    this.setState({ data: 'Hello' });

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
    return ( <ComposedComponent {...this.props}
                              component={this.state.component}
                              context={this.state.context} /> );
  }
};
```

### app.jsx

```javascript
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
            <div className="loader">Loading...</div>
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

```

### MovieDetail/MovieDetail.jsx

```javascript
import './_MovieDetail.scss';
import React from 'react';
import _ from 'lodash';
import MovieStore from '../../stores/MovieStore';

export default class MovieTile extends React.Component {
	constructor(props, ...args) {
		super(props, ...args);
	}

	render() {
		let movie = this.findMovieFromAll() || {};
		return (
			<div className='movie-detail-container'>
				<div className='movie-detail-content'>
					<div className="pull-left">
						<img height='300px' src={'img/' + movie.cover} width='200px'/>
					</div>
					<div className="pull-right">
						<h2>{movie.title}</h2>
						<h3>{movie.year}</h3>
						<p>{movie.description}</p>
						<p>
							<a href="/">
								<i className="fa fa-backward"/>
								<span>  Back</span>
							</a>
						</p>
					</div>
				</div>
			</div>);
	}

	findMovieFromAll() {
		let title = _.get(this.props.context, 'params.title', '');
		return MovieStore.getByTitle(title);
	}
}

MovieTile.defaultProps = {
	context: {}
};

MovieTile.propTypes = {
	context: React.PropTypes.object
};

```

### Header.jsx

```javascript
import React from 'react';
import './_Header.scss';
import AppActions from '../../actions/AppActions';
import page from 'page'; //Note: Can abstract to not rely heavily on page

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
            <i className="fa fa-remove"
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
    this.setState({submitted: true});
    page('/movies/' + this.state.searchTerm); //Note: can cleanup

  }

  sort(e) {
    AppActions.sortMovies(e.target.value);
  }

  reset() {
    page('/');
    this.setState({submitted: false, searchTerm: undefined});
  }

}

```

### movielist.jsx

```javascript
import React from 'react';
import './_MovieList.scss';
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
            return <MovieTile key={idx} movie={movie} />;
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
		//TODO: Update href
		return (<li className="movie-tile-container item">
				<div className="bg-img"
							style={{'backgroundImage': `url('img/${this.props.movie.cover}')`}}></div>
				<a href={'/movies/' + this.props.movie.title}>
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
		e.preventDefault();
		let stars = parseInt(e.target.attributes['data-rating'].value) + 1;
		this.setState({stars});
		AppActions.rateMovie(this.props.movie.title, stars);
	}
}


MovieTile.defaultProps = {
	movie: {}
};

MovieTile.propTypes = {
	movie: React.PropTypes.object
};

```