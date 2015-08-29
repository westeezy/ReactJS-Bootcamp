## ReactJS Bootcamp Day 2

###### React Component Lifecycle
<img src="http://facebook.github.io/react/img/logo.svg" alt="react"
width="100" />

*What we will cover:*

* React Lifecycle Methods
* Composibility
* Passing Props to children components
* Refs
* Add logic to our application for rating item

React components have their own lifecycle and API for dealing with changes. This is an important thing to really understand when building large applications with React. 

These lifecycle methods are as follow

* render() - this is the only required method to be implemented
* getInitialState()
* getDefaultProps()
* componentWillMount()
* componentDidMount()
* componentWillRecieveProps(nextProps)
* shouldComponentUpdate(nextProps, nextState)
* componentWillUpdate(nextProps, nextState)
* componentDidUpdate(prevProps, prevState)
* componentWillUnmount()
* 

Let's focus on diving into each one 

#####Render
This is the meat of your component. Render dictates what will be drawn to the screen. Render is also a pure function which mean given the same inputs x times it will return the exact same value each of those x times. Also render can not modify state. That makes sense because render is called on state or prop changes. So modifying either of those in render would cause in infinte loop or rerendering. It is important to keep in mind that render may be called fairly often on some components.

#####getIntialState and getDefaultProps
These two methods are fairly similar. Both set up something at component creation (called only once). Here is your chance to set up default values for state and props so in the event a prop isn't passed into the component or a key on state is falsey your component can still behave gracefully. Also it is worth mentioning you can set propTypes on a component to allow React to throw a console.warn is a prop you expect as a function comes in as an array or etc.

#####componentWillMount
This method is called just before the initial call to a component's render method. This is a good chance to make some logical state updates or build up operations for your component.

#####componentDidMount
This method comes into play largely when dealing with Flux or third party libraries. Here is where one would attach listeners in Flux patterns or if not using Flux this is a good place to make ajax requests. This method also marks the first chance in which you can interact with the DOM of your component (it will now have rendered).

#####componentWillRecieveProps(nextProps)
This method will be called if the props passed down into a child component are changed. Here you can react to that change before render is called and possibly even change a state variable if that is what you need to do. You can also compare the new props vs the old props as the new props come in as a parameter and old props are still accessible through `this.props`. This is a bit tricky to conceptualize at first so let me show you an example in which this method might be called.

```javascript
let class Parent extends React.Component {
  getIntialState() {
    return {
      result: {}
    };
  }
  
  componentDidMount() {
    request
    .get('/some-url')
    .end((err, result) => {
      this.setState({result}); 
      //This line above will trigger a rerender do to state change and Child will recieve the new prop.
    });
  }
  
  render() {
    return (<div>
              <Child data={this.state.result} />
            </div>)
  }
```

#####shouldComponentUpdate(nextProps, nextState)
This method is a powerful one and is used in React's pureRenderMixin. By default this will return true and a component will rerender on changes. If you override this method and return false the component will NOT rerender. This can potentially be used to squeeze out some extra performance by stopping senseless rerenders based on what your component is doing.

#####componentWillUpdate
This method is called just before a rerender of the component (not called before initial render). You can not modify the state here but you can do any other prep work needed for render.

#####componentDidUpdate
This method is called just after all renders besides the initial render. Can perform some work on the dom node here.

#####componentWillUnmount
This method is called during component teardown. This is a good place to unattach any listeners and perform any additional teardown work.

###Wiring this all into our Application
First of all one thing we want to see in our application is having more than one movie at a time. So maybe we can start making a movieList.jsx component that holds multiple movies.

Let's start by refactoring app.jsx to do 2 things.
1. Use MovieList over MovieTile
2. Pass a list of static movies as content over to the MovieList component so it can intelligently draw a few movies.

```javascript
// app/app.jsx
import './_App.scss';

import React from 'react';
import Header from '../Header/Header';
import MovieList from '../MovieList/MovieList'; //Notice remove of movieTile in favor of MovieList
import mockData from '../../mock/day0.json'; //Pull in some mock movie data from our static content

export default class App extends React.Component {

  constructor(...args) {
    super(...args);
  }

  render() {
    return (
      <div className={'app'}>
        <Header />
        {/*Pass some static content into MovieList as a prop named movies.*/}
        <MovieList movies={this.retrieveMovies()}/>
      </div>
    );
  }

  retrieveMovies() {
    //retrieve our static content to pass into MovieList
    return mockData ? mockData.movieTitles : [];
  }
}
```

Now there are two more things we need to do:
1. Create MovieList.jsx
2. Refactor MovieTile.jsx to take a movie as a prop

Starting with MovieList.jsx
```javascript
// movieList/MovieList.jsx
import React from 'react';
import MovieTile from '../MovieTile/MovieTile'; //Pull in our movie tile to loop over

export default class MovieList extends React.Component {
  constructor(...args) {
      super(...args);
      //this component has no state so no need for an initial setup of state
  }

  render() {
    return (<div className="movie-list">
      <ul className="items">
        {
          /*
            Notice how we can call map directly in the JSX and the array will be expanded.
            Also notice we are composing MovieTile in MovieList and the movies from app.jsx
            can flow from app -> MovieList -> Movie
          */
          this.props.movies.map((movieTitle, idx) => {
            return <MovieTile key={idx} movieTitle={movieTitle} />
          })
        }
      </ul>
    </div>);
  }
}

//Below we are doing two things. First and foremost we are telling our component we expect to be using 
// a prop named movies. We can initialize it to an empty array as to not break if we were to call movies.map
// and movies was not passed in.
//Secondly we tell the component that we expect this.props.movies to be an array and if it isn't
//React will throw a console.warn up in development environments
MovieList.deafultProps = {
  movies: []
};

MovieList.propTypes = {
  movies: React.PropTypes.array
};
```

Finally we need to refactor MovieTile as it no longer needs to have any reference to the full list of movies but rather just know about a single movie that we can pass in as a prop from MovieList's map in render.

```javascript
// movieTile/MovieTile.jsx
import React from 'react';
import _ from 'lodash';
import './_MovieTile.scss';

//No longer need to pull in any mock data as a dependency as we will get a single movie's info
//passed in as a prop from MovieList

const MAX_STARS = 5;

export default class MovieTile extends React.Component {
  constructor(...args) {
    super(...args);
    //set up the initial value of stars to be a random value from 1-5
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
            <h2>{this.props.movieTitle /*Can now reference a movies title via props*/}</h2>
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
  
  //Here we can wire up some simple click events on our rating stars to visually change rating
  //but because we are using static data it will be lost on refresh. 
  //To do this we add onclick handlers to the stars which we need to bind to this since React can't do that in es6
    return _.map(this.state.stars, (idx) => {
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
    //This is our click handler for stars and when a star is clicked and this method 
    //updates state the component will redraw with the new value for stars.
    let stars = parseInt(e.target.attributes['data-rating'].value) + 1;
    this.setState({stars});
  }
}

//Similar to MovieList we setup up defaultProps and defaultPropTypes
MovieTile.defaultProps = {
  movieTitle: 'A Wild Movie Appears'
}

MovieTile.propTypes = {
  moviesTitle React.PropTypes.string
};
```

##[Link to Day 3 - React Component State][Day 3]

[Day 3]: https://github.com/westeezy/ReactJS-Bootcamp/tree/master/walkthroughs/day3
