## ReactJS Bootcamp Day 6

###### More on Flux and App State + Routing
<img src="https://keyholesoftware.com/wp-content/uploads/React.js-Flux-3.png" alt="react" width="300" />

<img src="https://cask.scotch.io/2014/10/V70cSEC.png" alt="flux" width="300" />

*What we will cover:*

* More on Application State
* Introduction to routing
* Update our application to have the concepts of routing and global app state


We can now take what we've learned so far and create a basic router to enable our application to have a MovieDetail.jsx page. In most real world applications (including ones I've been working on) [React Router][React Router] is used. Another option is to use an ApplicationStore that handles Routing and global App State. That can be an exercise for the reader to create.

To get started one must first understand High Order Functions (especially in Javascript). [Eloquent Javascript][Eloquent Chapter] has a great introduction to High Order Functions so please take the time to read that.

>Functions that operate on other functions, either by taking them as arguments or by returning them, are called higher-order functions. If you have already accepted the fact that functions are regular values, there is nothing particularly remarkable about the fact that such functions exist. The term comes from mathematics, where the distinction between functions and other values is taken more seriously.

>Higher-order functions allow us to abstract over actions, not just values. They come in several forms. For example, you can have functions that create new functions.

So we are going to use a High Order Function to wrap app.jsx and enable us to have routing encapsulated within there. This allows us to have a much cleaner more modular code base. We will also make use of [page.js][Page.js]

```javascript
//Router.jsx
import React from 'react';
//Page.js is an awesome utility to handle routing in a SPA
import page from 'page';

//We need to have references to the Components which will represent our pages.
import MovieList from '../MovieList/MovieList';
import MovieDetail from '../MovieDetail/MovieDetail';

export var Enhance = ComposedComponent => class extends React.Component { //we name and export the Higher Order
                                                                          //React component
  constructor() {
    super();
    this.state = { data: null, component: null }; //component represents active page
  }

  componentDidMount() { //We could easily extract this routes into another module but because we only have two
                        //this is fine for now.
    page('/', (ctx) => { //default route is MovieList
      this.setState({
        component: MovieList,
        context: ctx
      });
    });

    page('/movies/:title', (ctx) => { //we can set up dynamic route params for MovieDetail
      this.setState({
        component: MovieDetail,
        context: ctx
      });
    });

    page({
      hashbang: true //Enable hashbang routing for old browsers.
    });

  }

  render() {
    return ( <ComposedComponent {...this.props}
                              component={this.state.component}
                              context={this.state.context} /> );
  }
};

```

```javascript
//app.jsx
'use strict';

import './_App.scss';

import React from 'react';
import { Enhance } from '../Router/Router';
import Header from '../Header/Header';
import AppActions from '../../actions/AppActions';
import MovieStore from '../../stores/MovieStore';
//No longer import MovieList or MovieDetail

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
        {//How we render the page/component from Router.jsx also this allows us to have a small loading screen.
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

```javascript
// new MovieDetail.jsx
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
    this.setState({submitted: true});
    page('/movies/' + this.state.searchTerm);

  }

  sort(e) {
    AppActions.sortMovies(e.target.value);
  }

  reset() {
    page('/'); // we can write a wrapper for page so if needed we can replace page in teh future with another lib
    this.setState({submitted: false, searchTerm: undefined});
  }

}
```

```javascript
//MovieList.jsx - just adding an href to go to detail on click
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
movietile.jsx

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

[React Router]: https://github.com/rackt/react-router
[Page.js]: https://visionmedia.github.io/page.js/
[Eloquent Chapter]: http://eloquentjavascript.net/05_higher_order.html

