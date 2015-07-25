## Code to write for Day 0

=======

### app.jsx
* don't write movielist just yet and keep just the tiles - day 2 is composition

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
    var searchBox;
    if (this.props.term) {
      searchBox = (
        <h3 className="term">
          {this.props.term} <a href='#'><i className="fa fa-times"/></a>
        </h3>
      );
    }
    else {
      searchBox = (
        <form className="search-form">
          <input className="search-input" type="text" placeholder="Search" />
        </form>
      );
    }

    return (
      <header className="app-header">
        <div className="inner">
          <h1 className="title">FakeFlix</h1>
          <div className="header-right">
            {searchBox}
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
