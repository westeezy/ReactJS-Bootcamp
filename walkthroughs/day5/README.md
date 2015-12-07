## ReactJS Bootcamp Day 5

###### Flux Introduction
<img src="https://keyholesoftware.com/wp-content/uploads/React.js-Flux-3.png" alt="react" width="300" />\

*What we will cover:*

* Introduction to Flux Application Architecture
* Actions, Dispatchers, and Stores
* Triggering actions in the view
* Start refactoring our application to take advantage of the Flux architecture

Yesterday for creating ability to sort and search movies we passed callbacks down our component tree. While that works it is not ideal to keep passing functions down. That's one of the many situation Flux can help us solve. Flux also enforces the single location for data mutation and a good way to handle our ajax calls.

Flux has a few components to it

* Actions
* A Single dispatcher
* Stores
* And of course our React View Components

This image is a great quick glance at what Flux achieves.

![Flux](https://facebook.github.io/flux/img/flux-simple-f8-diagram-explained-1300w.png)

###Single Dispatcher
As the word single implys we have only one dispatcher for our application. This dispatcher is the means to communicate from actions to stores. The dispatcher has no real logic and is just a registry of callbacks for when an action needs a store to react to a call. It can invoke those callbacks in a specific order if there are cross dependencies on multiple stores data.  Facebook's official dispather is actually a pretty small script and very easy to grok. [See for yourself][Facebook Dispatcher]

Most applications can have a simple dispatcher that is as follows

```javascript
var Dispatcher = require('flux').Dispatcher;

module.exports = new Dispatcher();
```

###Actions
You can create multiple action files. These actions are invoked by the views to trigger the flow from action -> dispatcher -> store to create our desired effect. Usually actions are invoked on user action or component load. The action can also have types such as TODO_ACTION. So the view can call `TodoActions.updateText('new todo');` and the action will look as follows

```javascript
  updateText: function(id, text) {
    AppDispatcher.dispatch({
      actionType: TodoConstants.TODO_UPDATE_TEXT, //Notice we have a constants file to hold our action types
      id: id,
      text: text
    });
  }
```

Also here is an example where the Dispatcher may need to be aware of multiple stores
```javascript
case 'TODO_UPDATE_TEXT':
  Dispatcher.waitFor([ //waitFor is available in Facebook's dispatcher
    PrependedTextStore.dispatchToken,
    YetAnotherStore.dispatchToken
  ]);

  TodoStore.update(PrependedTextStore.getText() + ' ' + action.text);
  break;
```

For more indepth information in dispatchers and actions see [here][Dispatchers and Actions]

###Stores

Facebook describes stores perfectly so I will just quote them verbatim 
>Stores contain the application state and logic. Their role is somewhat similar to a model in a traditional MVC, but they manage the state of many objects — they do not represent a single record of data like ORM models do. Nor are they the same as Backbone's collections. More than simply managing a collection of ORM-style objects, stores manage the application state for a particular domain within the application.

###How this wires into our Application

Well as we learned above we have a few new files to make. Let's start with the simpliest of them all: the dispatcher

```javascript
//dispatcher/AppDispatcher.js
import Flux from 'flux';

export default new Flux.Dispatcher(); //yay 
```

Now onto the action constants which are pretty self explanatory 
```javascript
//constants/AppConstants.js
export const MOVIES_GET_SUCCESS = 'ITEMS_GET_SUCCESS';
export const MOVIES_GET_ERROR = 'ITEMS_GET_ERROR';
export const MOVIES_UPDATED = 'ITEMS_UPDATED';
export const FIND_MOVIE_GET_SUCESS = 'FIND_MOVIE_GET_SUCESS';
export const SORT_MOVIES_BY_KEY = 'SORT_MOVIES_BY_KEY';
export const RATE_MOVIE = 'RATE_MOVIE';
```

ActionCreator (starting to get the picture here about what we are doing with Flux?)

```javascript
//actions/AppActions.js
import AppDispatcher from '../dispatcher/AppDispatcher';
import {
  getMovies, searchMovies
}
from '../util/api';
import {
  MOVIES_GET_SUCCESS,
  FIND_MOVIE_GET_SUCCESS,
  SORT_MOVIES_BY_KEY,
  RATE_MOVIE
}
from '../constants/AppConstants';

export default {

  fetchMovies() { //just passing along some data from API calls to stores in each of these
      getMovies().then((movies) => {
        AppDispatcher.dispatch({
          data: movies,
          actionType: MOVIES_GET_SUCCESS
        });
      });
    },

    searchMovie(title) {
      searchMovies(title).then((movie) => {
        AppDispatcher.dispatch({
          data: [movie],
          actionType: FIND_MOVIE_GET_SUCCESS
        })
      });
    },

    sortMovies(key) {
      AppDispatcher.dispatch({
        data: key,
        actionType: SORT_MOVIES_BY_KEY
      })
    },

    rateMovie(title, rating) {
      AppDispatcher.dispatch({
        data: {
          title, rating
        },
        actionType: RATE_MOVIE
      })
    }

};
```

Now for a more meaty piece the store

```javascript
//stores/MovieStore.js
import AppDispatcher from '../dispatcher/AppDispatcher';
import MovieModel from '../models/Movies';
import {
  EventEmitter
}
from 'events';

import {
  MOVIES_GET_SUCCESS,
  FIND_MOVIE_GET_SUCCESS,
  SORT_MOVIES_BY_KEY,
  RATE_MOVIE,
  MOVIES_UPDATED
}
from '../constants/AppConstants';

class MovieStore extends EventEmitter {

  constructor() {
    super();
    this.movieModel = new MovieModel(); //notice how we use our Domain Model in our corresponding store
  }

  getAll() {
    return this.movieModel.movies || [];
  }

  set(movies) {
    this.movieModel.movies = movies;
    this.emitChange();
  }

  sort(key) {
    this.set(this.movieModel.getSorted(key));
  }

  rate(title, rating) {
    this.movieModel.updateRating(title, rating);
    //no need to trigger an event as the UI updates itself on click and can let this lazily
    //happen on full refresh
  }

  emitChange() {
    this.emit(MOVIES_UPDATED);
  }

  addChangeListener(callback) { //view can register to this callback to know when it should update its data
    this.on(MOVIES_UPDATED, callback);
  }

  removeChangeListener(callback) { //view can unregister on destruction
    this.removeListener(MOVIES_UPDATED, callback);
  }
}

let store = new MovieStore();

AppDispatcher.register((action) => { //This is where the dispatcher ties into the store
  switch (action.actionType) {      //Stores will get ALL actions for dispatcher but store can choose
    case MOVIES_GET_SUCCESS:        //whether to use an action or ignore it
      store.set(action.data.movies);
      break;
    case FIND_MOVIE_GET_SUCCESS:
      store.set(action.data);
      break;
    case SORT_MOVIES_BY_KEY:
      store.sort(action.data);
      break;
    case RATE_MOVIE:
      store.rate(action.data.title, action.data.rating)
      break;
    default:
  }
});
export default store;
```

We can update the api a little to handle get and search movies.

```javascript
//utils/api.js
'use strict';

import movies from '../mock/movies.json';
import _ from 'lodash';

export function getMovies() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(movies);
    }, 1000);
  });
}

export function searchMovies(title) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let movie = _.findWhere(movies.movies, {title})
      resolve(movie)
    }, 1000);
  });
}
```


And thats pretty much it for the new files for Flux now we need to refactor our existing React components to take advantage of Flux.

To start let's wire up App.jsx to get the Movies from the store whenever it updates
```javascript
//app/app.jsx
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
    AppActions.fetchMovies(); //However you name actions make sure to stay consistent with case
                              //I chose fetchMovies but I could have easily chosen MovieListLoaded or AppStarting
                              
    MovieStore.addChangeListener(this.moviesUpdated.bind(this)); //Add a change listener to bind to 
                                                                //So that once the store is updated we can call
                                                                // upon the store to give us all it's movies.
  }

  render() { //Header no longer needs to be passed Movies as it can fire an action for search and sort
            //We do however manage our MovieList in App.jsx in terms of where we call the store when 
            // the store updates. We could have done this in MovieList.jsx instead but I find it easier
            // to keep components like MovieList resuable if their parents pass the data in as props whenever
            // possible. This way MovieList can be copy pasted into another App we create one day in the future
            // and only need to know it gets an Array of movielike objects.
    return (
      <div className={'app'}>
        <Header />
        <MovieList movies={this.state.movies} />
      </div>
    );
  }

  moviesUpdated() {
    this.setState({
      movies: MovieStore.getAll() //When the store triggers our view callback (which we registered to)
                                  // we know the movies have changed so let's update our state.
    });
  }
}
```

```javascript
//header/Header.jsx
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

  render() { //Header no longer needs movies as a prop it can now just fire actions to update the Movies
              // if the UI asks for a sort or search.

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

  search(e) { //See how much cleaner this feels. The Header doesn't care about the movies specifically
              //all the header knows is that the user clicked a button called search or sort.
              //Header doesn't need to register with any store callbacks or anything else.
              //Header is also much easier to test now as there is very little logic in it.
              // Searching and sorting can be tested in the store which is much easier as teh store 
              // is a plain old javascript file and doesnt need jsdom or anything of that nature.
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


```javascript
//MovieTile.jsx
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

  updateRating(e) { //Same as with header the rate logic can be moved into the Store making this component
                    // much easier to reuse and test.
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
##[Link to Day 6 - Application State and Routing][Day 6]

[Day 6]: https://github.com/westeezy/ReactJS-Bootcamp/blob/master/walkthroughs/day6
[Flux Diagram]: https://facebook.github.io/flux/img/flux-simple-f8-diagram-explained-1300w.png
[Facebook Dispatcher]: https://github.com/facebook/flux/blob/master/src/Dispatcher.js
[Dispatchers and Actions]: http://facebook.github.io/react/blog/2014/07/30/flux-actions-and-the-dispatcher.html
