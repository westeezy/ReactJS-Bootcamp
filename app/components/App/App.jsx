'use strict';

import './_App.scss';

import React from 'react';
import Header from '../Header/Header';
import MovieTile from '../MovieTile/MovieTile';

// TODO: Create App.jsx (Will replace stubbed component below)
// TODO: Load Header
// TODO: Load a MovieTile

const App = () => {
  return (
    <div className="app" style={{color: 'white'}}>
      <h1 style={{color: 'white', fontSize: '50px', textAlign: 'center'}}>
        Hello World!
      </h1>
    </div>
  );
};

export default App;
