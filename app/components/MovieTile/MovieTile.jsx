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
            <i className="fa fa-star"/>
            <i className="fa fa-star"/>
            <i className="fa fa-star"/>
            <i className="fa fa-star"/>
            <i className="fa fa-star"/>
          </div>
        </div>
      </div>);
  }
}
