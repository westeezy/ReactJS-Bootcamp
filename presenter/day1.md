## Code for Day 1

```javascript
//MovieTile.jsx
import React from 'react';
import './_MovieTile.scss';

export default class MovieTile extends React.Component {
  render() {
    let img = `img/fake${Math.floor(Math.random() * 5) + 1}.jpg`;

    return (<div className="movie-tile">
        <div className="img-container">
          <div className="img" style={{'backgroundImage': `url(${img})`}} />
        </div>
        <div className="info">
          <h1 className="title">Best Movie NA</h1>
          <h2 className="year">(2015)</h2>
          <div className="stars">
            *****
          </div>
        </div>
      </div>);
  }
}
```

note: add some extra `<MovieTile>`'s to `MovieList.jsx` to show what all
the renders look like and the randomized images
