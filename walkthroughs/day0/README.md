# ReactJS Bootcamp Day 0

## Introduction to [ES2015][ES2015] and Tooling
*Tools we will be using:*

* [Webpack][webpack] <img src="http://grammarly.github.io/pres-public/jslab-2015/react_and_webpack/img/webpack-logo.png" alt="webpack" width="25"/></dd>
* [Babel] <img src="https://babeljs.io/images/logo.svg" alt="babel" width="45"/>
* [ESlint] <img src="http://eslint.org/img/logo.svg" alt="eslint" width="25"/>
* Application shell

## [Webpack][webpack]
*What we will cover:*

* Start building wireframe app
* Script loading solutions, for example: [AMD] vs [CommonJS]
* [Browserify] vs [webpack]
* Task runners like [Grunt], [Gulp] and [Broccoli.js] vs simple npm scripts + preprocessing


## [Babel][Babel]
*What we will cover:*

* Transpiling JavaScript
* [JSX] transforms


## [ESlint][ESlint]
*What we will cover:*

* [Espree]
* Extendability
* Great [ES2015] and [React] support

## Intro to [ES2015][ES2015]
**So much to cover, so little time!**

*What we will cover:*

* Classes
* Arrow functions
* let
* Module loader
* De-structuring
* Default, rest, spread

For reference [here][Previous ES6 Talk] is the deck from the previous ES6 Brownbag

### Tooling

There is no shortage of Javascript tooling out there and no doubt most people have heard of at least a couple of various ones out there between Grunt, Gulp, jspm etc. For this bootcamp the focus will be using Webpack and just simple scripts (executed through npm). But its important to understand the tooling out there to make informed decisions. The big two often discussed first are Grunt and Gulp.

####Grunt
* focus on configuration
* does common tasks very well and very easily configured when going down a happy path
* [Why Grunt was craeted][Grunt Created]

Grunt is essentially an array of tasks where each task has its own configuration. When dealing with I/O each task will have sources and destination to read/write from/to and then the next text will pick up those files and do its work.

```javascript
grunt.initConfig({
  clean: {
    src: ['build/app.js', 'build/vendor.js']
  },
  
  copy: {
    files: [{
      src: 'build/app.js',
      dest: 'build/dist/app.js'
    }]
  }
  
  concat: {
    'build/app.js': ['build/vendors.js', 'build/app.js']
  }
  
  // ... other task configurations ...
  
});

//Notice how plugins are registered before the build
grunt.registerTask('build', ['clean', 'bower', 'browserify', 'concat', 'copy']);
```


####Gulp
* focus on code
* leverages streams for piping inbetween tasks
* doesn't enforce much of anything. just use code to wire up tasks and pipe information

Gulp takes a bit different approach where we use code to configure and execute tasks. Also another key difference is rather than each task having a source and destination set of files we use Node streams to pipe information from task to task. So files are not opened and closed and this gives a performance boost to our builds.

Also notice how there isn't much configuration. Gulp focuses on each plugin doing one small thing and doing it well before it transfers the stream over to the next plugin. This helps limit configuration.
```javascript
//import the necessary gulp plugins
var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');

//declare the task
gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});
```

#### NPM scripts
This one I won't dive too much into but there is always the option to go a homebrewed route and just use CLI node tools like browserify with npm scripts to run them. It obviously will take more upfront work but allows the most control over the build process

NPM scripts reside in your package.json and can be run by executing `npm run <scriptname>`

### Script Loading

Script loading in Javascript is not terribly new and many people have experience with Requirejs and AMD script loading. The two big players in this space currently are Browserify and Webpack. Though with ES6 modules now there are a few changes a foot but for the most part these are the two big players.

Once script loading is understood and it is time to make an informed decision the follow two articles will be essential to read and understand.

* [Browserify for Webpack users][Browserify for Webpack]
* [Webpack for Browserify users][Webpack for Browserify]

####Browserify
* Originally created to run Node code in the browser
* Batteries not included solution meaning there are many great plugins but Browserify itself is very simple and clean
* Has options for transforming files to do things like JSX or ES6 to ES5 (babel information coming soon)
* Leverages package.json settings (ideally)
* Plays nicely with NPM packages as they are not modified in any way and bundled cleanly

####Webpack
* Focused more on static asset management and made to work with Node after that
* Batteries included solution - has a lot of build in support for things like AMD vs Common and factor bundling
* Can require images and css files because it is focused on managing ALL static assets if possible and configured to

* [Great slideshow here][Slides Webpack]
* [Here is a nice objective article on the two][Webpack Browserify Drama]
* [Add another][Webpack vs Browserify]

###Note:
With these conversations around build tools (Grunt vs Gulp) and script loading (Webpack vs Browserify) it is important to not lose sight of the fact that these are all great tools. Sure there are pros and cons to each but if you are comfortable with one and it suits your needs there is no reason to stress and prematurely switch from one to another due to popularity or someone else opinion. I suggesst being familiar with them all and deeply understanding one from each category so that you can find a rythem to get your work done and understand any potential trade offs.

###ES2015 (ES6)
[ES6 in depth][ES6 Depth] This is a great place to go to learn about ES6 features. Through this bootcamp we will be focuses on classes, spread, comprehensions, etc. It is important to be familar with ES6 syntax and usage but as we go through the code it should be pretty easy to grok what is happening.

####Babel
This is a tool that allows us to transpile ES6 code into something all current browsers can support and use.  Babel also has support for React's JSX syntax to transpile that as well. We will begin to get more into JSX as we start to learn about React.


###Application Shell Buildout
For this app we will be using 
* Webpack with NPM scripts to kick off the builds
* Babel for transpiling
* Sass for styling
* Webpack Hot Reloading with React Hot Loader to enable the browser to auto load changes
* Eslint for code linting

The webpack in this example project is fairly robust so I will start by showing a simple development configuration that can be used in a React ES6 project.

```
var pkg  = require('../package.json'),
    path = require('path');

var DEBUG = process.env.NODE_ENV === 'development';
var TEST = process.env.NODE_ENV === 'test';

module.exports = {
  context: path.join(__dirname, '../public'),
  cache: DEBUG,
  debug: DEBUG,
  watch: DEBUG,
  devtool: DEBUG || TEST ? '#inline-source-map' : false,
  target: 'web',
  entry: './scripts/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(pkg.config.buildDir)
  },
  module: { //Notice the loaders for sass and jsx files
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel-loader'] },
      { test: /\.scss$/, loaders: ['style', 'css', 'sass']}
    ],
    noParse: [
      './public/scripts/dist/'
    ]
  }
}
```

Based on this config you can see we will be parsing css, and sass files with a scss loader and jsx files with the babel loader.


We are going to focus on building out component shells and discussing React specifics on Day 1. So to begin we need our entry point file.

```javascript
//app.jsx
'use strict';

import './index.html'; //We use ES6 modules which babel will convert into requires for webpack to work with
import 'babel-core/polyfill';
import 'normalize.css/normalize.css';
import './scss/app.scss'; //remember we allow webpack to manage all of our assets so we must require our styles
import 'font-awesome-webpack';

let context = require.context('.', true, /\.jpg?$/); //little trick to tell webpack to pull in all images at the gate. It will defaultly do this to images that are in stylesheets FYI.
context.keys().forEach(context);

import React from 'react';
import App from './components/App/App'; //We will create the first component here

React.render(
  <App />,
  document.getElementById('app') //Tell React to render our first component at this tag.
);
```

```javascript
//app/App.jsx
'use strict';

import './_App.scss';

import React from 'react';
import Header from '../Header/Header'; //We will write the following two files soon so lets add the import
import MovieTile from '../MovieTile/MovieTile';

export default class App extends React.Component { //notice how we extend React.Component using ES6 classes

  constructor(...args) {
    super(...args); //this is not required but if we were using some other features we might want to have this.
  }

  render() {//Here you can see the core idea of JSX in action notice how we use className to set classes.
            //Header and MovieTile will be automagically drawn into the Dom thanks to React.
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
//app/header/header.jsx
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

```javascript
//app/movielist/movielist.jsx
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

```javascript
//app/movietile/movietile.jsx
import React from 'react';
import './_MovieTile.scss';

export default class MovieTile extends React.Component {
  constructor(...args) {
    super(...args);
  }

  render() {
    let img = `img/fake${Math.floor(Math.random() * 10) + 1}.jpg`; //notice the use of let over var for ES6

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

With that we should see the shell of the appication loaded when we run `npm start`.




## [Link to Day 1 - Introduction to React][Day 1]

[webpack]: http://webpack.github.io "webpack"
[Babel]: http://webpack.github.io "Babel"
[ESlint]: http://eslint.org "ESlint"
[AMD]: http://requirejs.org/docs/whyamd.html "AMD"
[CommonJS]: http://www.commonjs.org "CommonJS"
[Browserify]: http://browserify.org "Browserify"
[Grunt]: http://gruntjs.com "Grunt"
[Gulp]: http://gulpjs.com "Gulp"
[Broccoli.js]: http://broccolijs.com "Broccoli.js"
[ES6 Depth]: https://hacks.mozilla.org/category/es6-in-depth/
[JSX]: https://facebook.github.io/react/docs/jsx-in-depth.html "JSX In Depth"
[Espree]: https://github.com/eslint/espree "Espree"
[ES2015]: http://www.ecma-international.org/ecma-262/6.0/ "ECMAScript 2015"
[React]: https://facebook.github.io/react/ "React"
[Day 1]: https://github.com/westeezy/ReactJS-Bootcamp/blob/master/walkthroughs/day1/README.md "Day 1 - Introduction to React"
[Grunt Created]: https://bocoup.com/weblog/introducing-grunt/
[Slides Webpack]: http://alp82.github.io/webpack-experiment-slides/#/
[Browserify for Webpack]: https://gist.github.com/substack/68f8d502be42d5cd4942
[Webpack for Browserify]: http://webpack.github.io/docs/webpack-for-browserify-users.html
[Webpack Browserify Drama]: http://blog.namangoel.com/browserify-vs-webpack-js-drama
[Webpack vs Browserify]: https://medium.com/@housecor/browserify-vs-webpack-b3d7ca08a0a9
[ES6 in depth]: https://hacks.mozilla.org/category/es6-in-depth/
[Previous ES6 Talk]: http://westinwrz.me/presentations/es6/#/
