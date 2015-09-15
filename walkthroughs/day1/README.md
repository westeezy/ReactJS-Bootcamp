## ReactJS Bootcamp Day 1

###### Introduction to React and JSX
<img src="http://facebook.github.io/react/img/logo.svg" alt="react" width="100" />

*What we will cover:*

* React as a view layer
* JSX syntax
* How to mount a component into the DOM
* What a simple component looks like
* Start improving our application

###### What is React

There is definitely a lot of buzz around JavaScript frameworks now and there is no shortage of them out there in the wild. One of the newcomers has also become one of the most popular, that framework is React. You can easily read all the documentation and articles from Facebook <a href="http://facebook.github.io/react/docs/why-react.html">here</a>, but if you did that I could stop here and move on with my life.

React is a view library for our front end applications. It makes no assumptions about what we are trying to do and just provides view components with a small but easily understandable public API. This public facing API is basically a list of lifecycle methods; the most important of these methods is `render()`. Render is the only mandatory method to implement and just draws the component to a specified location (eg div.class).  

So far that sounds pretty simple and it really is simple. The React components can compose other components as well. Keeping these components modular and independent can  lead to building an easy to maintain application.

There are a few concepts that separate React from say Angular 1.x or Backbone etc. Aside from React being only the view layer and not the fully fledged framework, one of the big changes from say Angular 1.x or Ember is that we are not using two way binding anymore. Most frameworks are coming around to follow this same idea, see Angular 2. This makes things a lot more maintainable as there will be less "magic". Instead what React does is it promotes component re-render on changes. You may think that sounds imperformant and it is. But let's go over a few things: 

1. React uses jsdom diffing so components are not redrawn in the dom, rather the diff from what is in the dom is calculated and only the differences are updated.

2. It's performant enough for the imperformant pieces to be unnoticeable.

React also using JSX syntax. JSX and React promote having the markup right inside of your view rather then in a template off in some other folder or etc. Here's an example of this...
```javascript
export default class Header extends React.Component {
  render() {
    return (
      <header className="app-header" style={{color: 'white'}}>
        Application Header
      </header>
    );
  }

}
```

This is interesting and probably feels a bit strange at first. As you start working on large applications you realize you templates are actually very closely related to your views. Maybe you've used Handlebars with Backbone and felt the pain of having a typo in the variable in the template and trying to track down why your view is drawing improperly.  So I implore you to  before judging JSX based on the previous push to separate view logic and templates, actually use JSX for an application and then draw your opinion. If you still don't like it thats fine. I for one love our JSX overlord.

Now I mentioned Composability. Let's take a look at how that works because this is an integral part of React.  React components can compose components which can compose more components. This allows you to create some cool things.  This is an image of Reddit's homepage

<img src="https://github.com/westeezy/ReactJS-Bootcamp/blob/master/walkthroughs/slides/day1/img/reddit.png"/>

I highlighted in different colors what pieces _may_ be components.  And you can imagine all these pieces are nested under a single application.

Think of components as little units of functionality. For example you might want to loop over li's in a ul and each li has the same look and feel maybe just a title and a description. You might want to make a <List /> Component and a <ListItem /> component in which List is the parent. That might look as follows (don't worry about syntax we will start getting more into that later).

```javascript
//List.jsx
import React from 'react';
import ListItem from './ListItem';
import TweetButton from '../social/TweetButton'; //maybe we want to have a tweet this list button

export default class List extends React.Component {
  render() {
    return (<ul>
      <ListItem />
      <ListItem />
      <ListItem />
      <TweetButton />
    </ul>);
  }
}

//ListItem.jsx
import React from 'react';

export default class ListItem extends React.Component {
  render() {
    return (<li>Hello User</li>);
  }
}

//TweetButton.jsx
import React from 'react';

export default class TweetButton extends React.Component {
  render() {
    return (<button>Tweet Me!</button>);
  }
}
```

Now you get a feel for what a real world use might look like. There is however still one large looming quesiton... How do we get this into the DOM. Where does it actually draw in? So let me just show you what the component mounting might look like..

```html
<!-- index.html abbreviated -->
<body>
  <div id="app"></div>
  <script src="js/myapp.min.js"></script>
</body>
```

```javascript
//app.jsx .. Let's create an app wrapper to pull in our super awesome list
import React from 'react';
import List from './components/List';
React.render(
  <List />,
  document.getElementById('app')
);
```


###Wiring this all into our Application
As of right now we have just a shell of a React application so let's start building up one piece at a time to get something real in place. We will begin by creating a proper app.jsx that pulls in both a page header and a movieTile component to render information about a single movie. 

```javascript
// app/app.jsx
import './_App.scss'; //pull in some predefined styles

import React from 'react';
import Header from '../Header/Header';
//The following component we will be building in just a second and it's rendered output will be contained
//within the .app div
//If you recall yesterday we build Header.jsx while talking about es6 and tools so it's code should
//start making sense now.
import MovieList from '../MovieTile/MovieTile';

export default class App extends React.Component {

  constructor(...args) {
    super(...args);
  }

  render() {
    return (
      <div className={'app'}>
        <Header />
        <MovieTile />
      </div>
    );
  }
}
```

```javascript
// movieTile/MovieTile.jsx
import React from 'react';
import _ from 'lodash';
import './_MovieTile.scss';
//Below is some dummy data I setup with movie information. 
//A nice part about webpack is we can pull in more than just js files so let's pull in some static content
import {movieTitles} from '../../mocks/movieTitles.json';

//Let's set up a max rating count and mark it const and let it belong to the module for now
//rather than store on state or props in the component itself since we know it will not change
const MAX_STARS = 5;

export default class MovieTile extends React.Component {
  constructor(...args) {
    super(..args);
    //Below we set up an initial state with a random number of stars
    //notice that because we are using es6 we will set up initial state in the 
    //constructor rather than in getInitialState.
    this.state = {
      stars: (Math.floor(Math.random() * 5) + 1)
    };
    
    //Again because we are using es6 React is not able to bind the proper context to all the methods
    //of the component so let's bind a method we will use to draw some FontAwesome stars.
    this.retrieveRating.bind(this);
  }

  render() {
    //Grab a random image from some static content
    let img = `img/fake${Math.floor(Math.random() * 10) + 1}.jpg`;

    //Notice how with react you are able to pass in object to set up inline styles.
    return (<li className="movie-tile-container item">
        <div className="bg-img" style={{'backgroundImage': `url('${img}')`}}></div>
        <a href="#">
          <div className="content">
            <h2>{this.retrieveTitle()}</h2>
            <div className="stars">
              {
                /*
                  Notice how I can call methods inside interpolation blocks with React to retrieve the stars
                  If this.retrieveRating were to return null react is smart enough to know to not draw anything
                  Similarly if it returns an array of components React can expand those.
                  */
                this.retrieveRating()
              }
            </div>
          </div>
        </a>
      </li>);
  }

  retrieveTitle(index=0) { //Default parameters with es6 coming in handy here
    return movieTitles[index]; //grab the title of the first movie in our static content files
  }

  retrieveRating() {
    //Take note of the comment on line 184 about how you can call methods inside of your JSX to
    //Draw out more components etc.
    //fa-star draws a filled in star while fa-star-o will draw an empty one for us.
    return _.map(_.range(MAX_STARS), (idx) => {
      return idx < this.state.stars ?
              <i key={idx} className="fa fa-star"/>
              : <i key={idx} className="fa fa-star-o"/>;
          });
  }
}
```

So at this point we have an app with a header and a single static movie tile. Tomorrow we can start looking into how to build a list of movies and leverage our movieTile.jsx more generically.

## [Link to Day 2 - React Components][Day 2]


[Day 2]:https://github.com/westeezy/ReactJS-Bootcamp/tree/master/walkthroughs/day2

