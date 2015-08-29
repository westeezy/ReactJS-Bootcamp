## Talking points

* The main difference between Gulp and Grunt lies in how they deal with their automation tasks on the inside. Gulp uses Node streams while Grunt uses temp files.
* Grunt uses intermediary files while gulp does it all in memory
* The argument goes like this: Gulp is a good example that code over configuration can be a good thing when configuration gets a bit confusing. Other people say that while this is true and Gulp is easier to read, it is more difficult to write because piping can be a bit confusing.


* CommonJS give you two tools:
 1. the require() function, which allows to import a given module into the current scope.
 2. the module object, which allows to export something from the current scope.


## Code to write for Day 0

=======

### app.jsx
```javascript
'use strict';

import './_App.scss';

import React from 'react';
import Header from '../Header/Header';
import MovieTile from '../MovieTile/MovieTile';

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


### header.jsx

* gloss over pretty quickly
* conditionally loading jsx
* calling super

```javascript
import React from 'react';
import './_Header.scss';

export default class Header extends React.Component {

  constructor(...args) {
    super(...args);
  }

  render() {
    return (
      <header className="app-header">
        <div className="inner">
          <h1 className="title">FakeFlix</h1>
          <div className="header-right">
            <form className="search-form">
              <input className="search-input" type="text" placeholder="Search" />
            </form>
            <select value={this.props.layout} className="display-select">
              <option>View By:</option>
              <option value="tile">Tile</option>
              <option value="list">List</option>
            </select>
          </div>
        </div>
      </header>
    );
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
        <MovieTile/>
      </ul>
    </div>);
  }
}
```

### movietile.jsx

```javascript
import React from 'react';
import _ from 'lodash';
import './_MovieTile.scss';

export default class MovieTile extends React.Component {
  constructor(...args) {
    super(...args);
  }

  render() {
    let img = `img/fake${Math.floor(Math.random() * 10) + 1}.jpg`;

    return (<li className="movie-tile-container item">
    		<div className="bg-img" style={{'backgroundImage': `url('${img}')`}}></div>
        <a href="#">
    			<div className="content">
    				<h2>{this.props.movieTitle}</h2>
            <div className="stars">
              <i className="fa fa-star" />
            </div>
    			</div>
    		</a>
      </li>);
  }
}
```
