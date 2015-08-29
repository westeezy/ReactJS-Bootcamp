## ReactJS Bootcamp Day 4

###### React Forms and Events
<img src="http://facebook.github.io/react/img/logo.svg" alt="react" width="100" />

*What we will cover:*

* Data binding to form components
* Controlled vs Uncontrolled Inputs
* Updating state after form fields change
* Update inputs in our app header
* Add logic to our application for handling Rating more properly from form

Today we will dive into creating forms using React. And lucky for us React provides a few tools to making inputs and forms a lot easier.

Starting with inputs, there is an onChange method in React to track changes on your inputs. To add onto that there is a concept of Controller vs Uncontrolled inputs in React that ties into onChange.

####Controlled Inputs - Form Component with a value set

* Always shows whats in it's value prop
* Direct user input doesn't directly update value thus will need to be handled
* onChange is used to update the value prop and thus the UI
* React owns this components state

```javascript
getInitialState() {
  return {
    value: "Person"
  }
}
handleChange(event) { //Notice how on change updates the state which corresponds to the input value
  this.setState({
    value: event.target.value
  });
}
render() {
return (<div>
  <input type="text" value={this.state.value} onChange={this.handleChange} />
  <span>{'Hello ' + this.state.value}</span>
  </div>);
}
```


####Uncontrolled Inputs - Form Component without value set
* Value reflects user input
* Can still use onChange if you want to listen to value updates

```javascript
  render: function() { //Notice how we can still have a default value
    return <input type="text" defaultValue="Hello!" />;
  }
```

####Updating the Header in our Application
The header two good examplse of a form component: the Search and Sort inputs can trigger a form submit on change.

Starting with the search we have a simple input box currently but let's update that to actually do something on enter click. 

```javascript
//Header.jsx
constructor(...args) {
  super(...args);
  this.state = {
    searchTerm: null, //Get the Defaults set up for when the component is freshly loaded
    submitted: false
  };
}
  
render() {
  var searchBox;
  if (this.state.submitted) { // If a serach was performed we want to hide the search input and show the query
    searchBox = (
      <h3 className="term">
        {this.state.searchTerm}
        <a href='#'>
          <i className="fa fa-times"
              onClick={this.reset.bind(this)}/>
        </a>
      </h3>
    ); //We need to bind this on the onClick because we are using ES6 and React can't bind context for us
  }
  else { //If a search is not active we can just show the search input
         //We bind the form submit to an action that will update the state of this component
         // and also call to a prop passed in from app.jsx that will trigger a search
         // remember components own their own state and only their own state which is why header
         // uses a callback to trigger the search. We will update App.jsx momentarily to add those callbacks.
         
         //Also Take note of the onSubmit callback React gives us for the Form
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

  return ( //notice how we can render the searchBox variable in jsx syntax just like any simple variable type
    <header className="app-header">
      <div className="inner">
        <h1 className="title">FakeFlix</h1>
        <div className="header-right">
          {searchBox}
          <select className="display-select">
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
  let searchTerm = e.target.value; //update the value of state to update the Controlled search input
  this.setState({searchTerm});
}

search(e) {
  e.preventDefault();
  this.props.search(this.state.searchTerm);
  this.setState({submitted: true}); //Set submitted to true to hide the search box and show the query
}
```


As you can imagine adding sort functionality to this is very similar in nature so the code for that looks as follows

```javascript
//Header.jsx completed
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

  sort(e) { //adding the sort callback
    this.props.sort(e.target.value);
  }

  reset() { //add a reset to the search to perform a new search
            // notice how we update the value of searchTerm as we are using a Controlled form input
    this.props.reset();
    this.setState({submitted: false, searchTerm: undefined});
  }

}

Header.defaultProps = { //Set default props so if App.jsx does not pass them we can fail gracefully
  sort: function() {},
  search: function() {},
  reset: function() {}
}



Header.propTypes = { //Notice how we set prop types to enforce the props coming in from App.jsx
  sort: React.PropTypes.func,
  search: React.PropTypes.func,
  reset: React.PropTypes.func
};
```

This is pretty great stuff but App.jsx does not yet provide the callbacks we are telling Header.jsx to expect. Also App.jsx will need a way to get all the Movies if we expect sort to be a concern of App.jsx which we do as multiple components can work on the MovieList. This way if the movies change each component will recieveNewProps and thus rerender with the new information.

```javascript
//app.jsx
'use strict';

import './_App.scss';

import React from 'react';
import _ from 'lodash';
import Header from '../Header/Header';
import MovieList from '../MovieList/MovieList';

//The following two pieces we will be building shortly
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
    return ( //Notice how we pass in a few methods to be executed inside of Header.jsx and MovieList.jsx
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
    //Where did moviesModel come from? We will go over that below
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

So in order to keep our movies in a clean spot with a nice api let's make a moviesModel to support the method App.jsx is using above. This model can be just a plain ole javascript class. No React is needed.

```javascript
import _ from 'lodash';

/*
 * Could clean this up to be export new MoviesModel() instead and then just
 * use it as a singleton but for the purpose of demo we are not yet
 */

export default class movies {
    //no constructor on purpose

    get movies() { //ES5 brought us getters/setters and ES6 exposed them in a class syntax
        return _.clone(this._movies); //always operate on a clone to create immutability or use immutable.js
                                      //this makes it very easy to track changes to domain objects.
    }

    set movies(movies) { //only way to modify movies
                         // could have used Symbols trick as well
        this._movies = movies;
    }

    getSorted(key) {
        let movies = this.movies;
        return _.sortBy(movies, (movie) => { //lodash makes sorting strings easy
          if(key === 'rating') {
            return parseInt(movie[key])
          }

          return movie[key];
        });
    }

    getBySearch(title, moviesArray) { //allow searching a random array as well for flexibility later
        let movies = moviesArray || this.movies;
        let result = _.findWhere(movies, {title});
        return result ? [result] : []; //always return something the view can handle gracefully
    }

    updateRating(title, rating) { //remeber view should never directly update the domain models.
        let moviesList = this.movies;
        let [movie] = this.getBySearch(title, moviesList);
        if(movie) {
            movie.rating = '' + rating;
            this.movies = moviesList;
        }
    }
}
```



##[Link to Day 5 - Intro to Flux][Day 5]

[Day 5]: https://github.com/westeezy/ReactJS-Bootcamp/blob/master/walkthroughs/day5/
