## ReactJS Bootcamp Day 3

###### React Component State
<img src="http://facebook.github.io/react/img/logo.svg" alt="react" width="100" />

*What we will cover:*

* Component State and more on Lifecycle
* Manipulating State
* How components can store their data
* Add logic to our application for handling data via a promise
* Start fixing up the header a bit

######Component State
At the end of Day2 we addd some state logic into MovieTile.jsx to hold data about a movie's rating. Now we will dive into React's component state and proper usage of state.

One must be very careful when working with state as you can wind up with hard to debug code and spaghetti logic. State gets especially hairy when multiple components rely on a property of some sort of global state. It is always best to avoid shared global state when possible. So a good way to think about this is for MovieTile it had this.state.stars for rating. But nowhere else in the application do we care what a movie's rating is. Sure the static mock data has a rating value but if MovieTile owns the concern of rating a movie why not just let MovieTile edit it's own stars and propagate that data up to wherever it may live. That way if there is an issue with this.state.stars we know where it is coming from. And also there is a huge benefit of keeping state as simple types. Notice how the MovieTile doesn't store the whole movie on state. Only what it needed to perform changes - stars.

######Getting into the core concept of React's state
React State is immutable in its own right but you can update a components state using `this.setState({})` which is an asynchronous method to update state. React will see the invocation of this method and later update state and call `render()`. So you can have multiple properties on state and update a single prop with `this.setState({prop1: false})` and the other props will still exist and remain the same value. Remeber to keep in mind as with any framework the less data on state the easier it is to test.

######Update State
As mentioned we can update state through `this.setState({})` but because that triggers a rerender we can not update state in render's lifecycle.  A good place for state to update is with dom events or maybe ajax call completion etc. 

######Pure Rendering
We can also tell React not to rerender on all state changes by using `shouldComponentUpdate(nextProps, nextState)`. This is a powerful tool and is actually use in React's `pureRenderMixin` located [here][React Pure Render]

```
//code for convenience 
/**
 * If your React component's render function is "pure", e.g. it will render the
 * same result given the same props and state, provide this Mixin for a
 * considerable performance boost.
 *
 * Most React components have pure render functions.
 *
 * Example:
 *
 *   var ReactComponentWithPureRenderMixin =
 *     require('ReactComponentWithPureRenderMixin');
 *   React.createClass({
 *     mixins: [ReactComponentWithPureRenderMixin],
 *
 *     render: function() {
 *       return <div className={this.props.className}>foo</div>;
 *     }
 *   });
 *
 * Note: This only checks shallow equality for props and state. If these contain
 * complex data structures this mixin may have false-negatives for deeper
 * differences. Only mixin to components which have simple props and state, or
 * use `forceUpdate()` when you know deep data structures have changed.
 */
var ReactComponentWithPureRenderMixin = {
  shouldComponentUpdate: function(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  },
};
```

###Wiring this all into our Application

We want to start by updating our App.jsx to get movies from a fake api.

```javascript
//app.jsx
'use strict';

import './_App.scss';

import React from 'react';
import _ from 'lodash';
import Header from '../Header/Header';
import MovieList from '../MovieList/MovieList';
import { getMovies } from '../../util/api'; //new api file

export default class App extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {
      movies: []
      //set default state of movies to empty for when component first loads and is waiting for ajax
    };
  }

  componentDidMount() { //Remember from LifeCycle discussion that componentDidMount is the location 
                        // to integrate with APIs or 3rd party libraries
    getMovies().then((movies) => {
      movies = movies.movies;
      this.setState({movies}); //Component will rerender when we update the state to have the result
                               // of the api call.
    });
  }

  render() { //We want to past the movies down to the movieList component so it can render them
    return (
      <div className={'app'}>
        <Header />
        <MovieList movies={this.retrieveMovies()}/>
      </div>
    );
  }

  retrieveMovies() { //method to get movies in case we need to do any transformations
    return this.state.movies || [];
  }
```

```javascript
//utils/api.js
'use strict';

import movies from '../mock/movies.json';

export function getMovies() {
  return new Promise((resolve) => { //really simple fake way to get movies
    setTimeout(() => {
      resolve(movies);
    }, 1000);
  });
}
```


Now if you notice since we are still passing movies as a prop to MovieList.jsx there are absolutely no updates needed to that file.

Now we can actually start updating Header.jsx to do something more functional. So first update app.jsx to have the following in render

```javascript
//inside of render ->
 <Header sort={this.sortMovies.bind(this)}
                search={this.searchMovies.bind(this)}/>
//new class methods
searchMovies(key) { //search for movies that we can pass down into Header to call
  let searchResults = _.findWhere(this.state.movies, {title: key});
  this.setState({movies: [searchResults]});
}

sortMovies(key) { //sort for movies we can pass into Header to call
  let sorted = _.sortBy(this.state.movies, (movie) => {
    if(key === 'rating') {
      return parseInt(movie[key])
    }

    return movie[key];
  });

  this.setState({movies: sorted});
}
```

Now we can update Header.jsx to take advantage of these. And tomorrow we will go into detail about how forms and inputs are used in React.

```javascript
mport React from 'react';
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
      searchBox = ( //we will talk about forms more tomorrow
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
    let searchTerm = this.refs.searchBox.getDOMNode().value; //we can use refs to grab the value form the DOMNode
    this.setState({searchTerm});
    this.props.search(searchTerm); //can't use state because its async
  }

  sort(e) {
    //this does not properly sort by user selected rating so we talk about that limitation and fix
    //on day 4
    this.props.sort(e.target.value);
  }

}

Header.defaultProps = { //Set default props so we can fail gracefully if app.jsx doesn't pass them in
  sort: function() {},
  search: function() {}
}
```


##[Link to Day 4 - React Forms and Events][Day 4]

[Day 4]: https://github.com/westeezy/ReactJS-Bootcamp/blob/master/walkthroughs/day4/
[React Pure Render]: https://github.com/facebook/react/blob/531e6280a357515512dbcefe9170dbd8bf109d4a/src/addons/ReactComponentWithPureRenderMixin.js
