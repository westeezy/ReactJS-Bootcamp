# Day 2 Walkthrough

* Start by showing the day2.pdf slides, talking about each point.

## Composability

* First show how to do interpolation within JSX by changing the 
  MovieTile component's title in the render method:
  
```javascript

    render() {
        let img = `img/fake${Math.floor(Math.random() * 10) + 1}.jpg`;
        
        let movieTitle = "Sleepless In Seattle";
        
        return (
            <div className="movie-list">
                <ul className="items">
                    <li className="movie-tile-container item">
                        <div className="bg-img" style={{backgroundImage: `url('${img}')`}}/>
                        <a href="#">
                            <div className="content">
                                <h2>{movieTitle}</h2>
                                <div className="stars">
                                    <i className="fa fa-star"/>
                                    <i className="fa fa-star"/>
                                    <i className="fa fa-star"/>
                                    <i className="fa fa-star-o"/>
                                    <i className="fa fa-star-o"/>
                                </div>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>);
    }
    
```

* React components can be nested one inside of each other
* This is the general pattern
   * A parent component passes information down to its child components
   * Container components or "smart" components handle retrieving data and
     passing it down to the appropriate "dumb" components which simply
     handle displaying data.
     
* Demonstrate Composability by moving the movie rating section from
  MovieTile to it's own Rating component
  
```javascript

var React = require('react');

// We will talk later about how to pass in the starCount form the parent

export default class Rating extends React.Component {

    render: function () {
        return (
            <div className="stars" style={{color: 'gold'}}>
                <i className="fa fa-star"/>
                <i className="fa fa-star"/>
                <i className="fa fa-star"/>
                <i className="fa fa-star-o"/>
                <i className="fa fa-star-o"/>
            </div>
        );
    }
};

```

* Then update MovieTile to import the Rating component and add it in
  the render function where the hard coded rating used to be:
  
```javascript
import Rating from '../Rating/Rating';


    render() {
        let img = `img/fake${Math.floor(Math.random() * 10) + 1}.jpg`;
        
        let movieTitle = "Sleepless In Seattle";
        
        return (
            <div className="movie-list">
                <ul className="items">
                    <li className="movie-tile-container item">
                        <div className="bg-img" style={{backgroundImage: `url('${img}')`}}/>
                        <a href="#">
                            <div className="content">
                                <h2>{movieTitle}</h2>
                                <Rating>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>);
    	}
```

* Now we have A MovieTile component whose child is a Rating component

* We can do the same with MovieTile.  We plan on having a List of Movies eventually
so we can create a MovieList component to handle rendering our various MovieTiles

* Our MovieList component is already set up and contains the MovieTile component:

```javascript

import React from 'react';
import './_MovieList.scss';
import MovieTile from '../MovieTile/MovieTile';

/*
 * 1. How do we ensure props are defaulted
 2. How do we ensure props are the right type
 3. How do we have an array of this.props.movies draw each tile
 */

// TODO: Default Props for the api call result in App.jsx
// TODO: Validate props coming in from App.jsx

export default class MovieList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="movie-list">
                <ul className="items">
                    <MovieTile />
                </ul>
            </div>);
    }
}


```

* We can add this Component onto App.jsx and clean up MovieTile a bit to remove some
of the redundant jsx:

### App.jsx

```javascript

import './_App.scss';

import React from 'react';
import Header from '../Header/Header';
import MovieList from '../MovieList/MovieList';

export default class App extends React.Component {

    constructor(...args) {
        super(...args);
    }

    render() {
        return (
            <div className="app">
                <Header />
                <MovieList />
            </div>);
    }
}

```

* and in MovieTile we remove:

```javascript

<div className="movie-list">
    <ul className="items">
    
    </ul>
</div

```

* Next we can fix up the Rating component to use a function to produce our 
  jsx markup so that it's dynamic rather than static:
  
```javascript

const MAX_STARS = 5;

export default class Rating extends React.Component {
    
    ...
    
    retrieveRating(numStars) {
        return  (
            _.map(_.range(MAX_STARS), (idx) => {
                return idx < numStars ? <i key={idx} className="fa fa-star" /> : 
                                        <i key={idx} className="fa fa-star-o" />;
            });
    }

```



* Now that we've seen how we compose our Components and that we can produce JSX dynamically
  via a function call, now we can set up a component to produce a list of MovieTile for 
  us so that we can get closer to the finished product.
  


## mock data

* show app/mock/movies.json
* show app/util/api.js and how it pulls in movies.json

* Given that we can pull in a list of movies now we can update App.jsx and pass
that data down to our MovieList which will then be responsible for rendering it's
child MovieTile elements;

* Add the following to App.jsx:

```javascript

    import { getMoviesNow } from '../../util/api';

```

## Props

* To pass our moviesList prop to the MoviesList component we do the following

```javascript

render() {

let moviesList = getMoviesNow();

return (
    <div className="app">
        <Header />
        <MovieList movies={moviesList} />
    </div>);

}

```

* Then to access this moviesList in our MoviesList components we'll use the
  this.props.movies variable
  
* In MovieList we can write a function that will produce our MovieTile components
  in much the same way that we produced our stars in the Ratings component:
  
  
```javascript

import _ from 'lodash';

export default class MovieList extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className="movie-list">
                <ul className="items">
                    {this.getMovieTiles()}
                </ul>
            </div>);
        )
    }
    
    getMovieTiles() {
        let movies = this.props.movies;
        
        return _.map(movies, (movie, idx) => {
            return <MovieTile key={idx} movie={movie} />
        });
        
    }

}

```

* And now we have our list of movies displaying on the screen

* But They still aren't correct as our MovieTiles are still hardcoded to 
display static information and our Ratings are also only displaying static information

* First lets sort out MovieTile:


```javascript

import React from 'react';
import './_MovieTile.scss';
import '../MovieList/_MovieList.scss';

import Rating from "../Rating/Rating";

export default class MovieTile extends React.Component {
	constructor(props, ...args) {
		super(props, ...args);
	}

    // TODO: Make Movie Title a variable that gets interpolated
    // TODO: Abstract the stars into a method that returns the JSX
    // TODO: How might we have this function accept the parameters of getStars(filledStars, totalStars)?
    // TODO: How might we abstract Stars into it's own component? (named Rating)

    render() {
        let img = `img/${this.props.movie.cover}`;
    
        return (
            <li className="movie-tile-container item">
                <div className="bg-img" style={{backgroundImage: `url('${img}')`}}/>
                <a href="#">
                    <div className="content">
                        <h2>{this.props.movie.title}</h2>
                        <Rating rating={this.props.movie.rating}/>
                    </div>
                </a>
            </li>);
    }
}

```

* At this point we can show how to set up default property types, which allows
us to default to a value AND allows us to determine the type of value that is
allowed to be passed down.

* Outside the class declaration on MovieTile and MovieList

```javascript

MovieTile.defaultProps = { movie: {} };
MovieTile.propTypes = { movie: React.PropTypes.object };

MovieList.defaultProps = { movies: [] };
MovieList.propTypes = { movies: React.PropTypes.array };


```

* Finally updating the Rating component using props:

```javascript

    render() {
        return (
            <div className="stars" style={{color: "gold"}}>
                {this.retrieveStars(this.props.rating)}
            </div>
        );
    
    }

```
## State

* read day3.pdf

* First lets set our initial state in our App Component and then  we can 
  add our api call in the componentDidMount method of the App Component:

```javascript

import './_App.scss';

import React from 'react';
import Header from '../Header/Header';
import MovieList from '../MovieList/MovieList';

import { getMoviesNow } from '../../util/api';

export default class App extends React.Component {

    constructor(...args) {
        super(...args);
        this.state = {
            movies: []
        }
    }

    componentDidMount() {
        let moviesList = getMoviesNow();
        this.setState({
            movies: moviesList
        });
    }

    render() {

        return (
            <div className="app">
                <Header />
                <MovieList movies={this.state.movies} />
            </div>);
    }
}

```

* Note that in the React dev tools we can see the state properties on our App
Component.  Also note that we can change these state values in the dev tools
(not refs) to update the app in real time.

* Next we update the Ratings component to utilize state and React's event system
 in order to get our ratings to work
 
* First we'll need to update the retrieveStars elements to include the onClick event
and handler and the data-rating attribute so that we can access the data

* Then we'll need to set up the initial state and make sure that render is 
passing the state variable into the retrieve Stars method

* create the udpateRating method to preventDefault on the event, get the integer
value from e.target.attributes['data-rating'].value (using parseInt() + 1, then
setting the state with that value:

```javascript

import React from "react";

import _ from "lodash";

// We will talk later about how to pass in a star count from the parent

const MAX_STARS = 5;

export default class Rating extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stars: props.stars
        }
    }

    render() {
        return (
            <div className="stars" style={{color: 'gold'}}>
                {this.retrieveStars(this.state.stars)}
            </div>
        );
    }

    retrieveStars(numStars) {
        return (
            _.map(_.range(MAX_STARS), (idx) => {
                    return idx < numStars ? <i key={idx}
                                               onClick={this.updateRating.bind(this)}
                                               className="fa fa-star"
                                               data-rating={idx}/> :
                                            <i key={idx}
                                               onClick={this.updateRating.bind(this)}
                                               className="fa fa-star-o"
                                               data-rating={idx}/>;
                }
            )
        );
    }

    updateRating(e) {
        e.preventDefault();
        let stars = parseInt(e.target.attributes['data-rating'].value) + 1;
        this.setState({ stars });

    }
};

Rating.defaultProps = { rating: 0};
Rating.propTypes = {rating: React.PropTypes.number};


```

## Wiring up Search

* In order to get search working we'll have to make use of another helper method in 
Movies.js in the /app/models/ directory.

* The model helps us by allowing us to set the movies we get from the api on it
then it can handle changing our moviesList, at which time we'll update our state
on the app, letting those changes propagate downward to the other components.

* Lets add it to the App.js file:

```javascript

import './_App.scss';

import React from 'react';
import Header from '../Header/Header.solution';
import MovieList from '../MovieList/MovieList';

import MoviesModel from '../../models/Movies';
import { getMoviesNow } from '../../util/api';

let moviesModel = new MoviesModel();

export default class App extends React.Component {

    constructor(...args) {
        super(...args);
        this.state = {
            movies: []
        }
    }

    componentDidMount() {
        MoviesModel.movies = getMoviesNow();
        this.setState({
            movies: moviesModel.movies
        });
    }

    render() {

        return (
            <div className="app">
                <Header />
                <MovieList movies={this.state.movies} />
            </div>);
    }
}

```

* Next we can set up methods to call our MoviesModel's search and sort methods:


```javascript


    render() {

        return (
            <div className="app">
                <Header search={this.search.bind(this)}
                        sort={this.sort.bind(this)}/>
                <MovieList movies={this.state.movies} />
            </div>);
    }

    search(term) {
        this.setState({
            movies: moviesModel.getBySearch(term)
        });
    }
    
    sort(term) {
        this.setState({
            movies: moviesModel.getSorted(term)
        });
    }
}

```

* Then we need to add it into the Header Component

* In the Header first we need a way to get the search value, which we do by utilizing the
ref attribute on the search input:

```javascript

render() {
        return (
            <header className="app-header">
                <div className="inner">
                    <h1 className="title">FakeFlix</h1>
                    <div className="header-right">
                        <Login />
                        <form className="search-form" onSubmit={this._submit.bind(this)}>
                            <input ref="searchBox"
                                   className="search-input"
                                   type="text"
                                   placeholder="Search"/>
                        </form>
                        <select onChange={this._viewChange} className={"display-select"}>
                            <option>View By:</option>
                            <option value="Title">Title</option>
                        </select>
                    </div>
                </div>
            </header>
        );
    }

```

* Then in the submit method we can get the inputs value buy using the searchBox id

```javascript

 search(e) {
        e.preventDefault();
        let value = this.refs.searchBox.value;
        this.props.search(value);
    }

```

* The sort method is even easier

```javascript

sort(e) {
    e.preventDefault();
    this.props.sort(e.target.value);

}

```




