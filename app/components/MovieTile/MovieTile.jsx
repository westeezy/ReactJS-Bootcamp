import React from 'react';
import './_MovieTile.scss';
import Rating from '../Rating/Rating';

// TODO: Set DefaultProps
// TODO: Set PropTypes
// TODO: Pass in value to Rating
// TODO: Update MovieImg

export default class MovieTile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let img = `img/fake${Math.floor(Math.random() * 10) + 1}.jpg`;
    let title= 'Sleepless in Seattle';

    return (<li className="movie-tile-container item">
        <div className="bg-img" style={{'backgroundImage': `url('${img}')`}}></div>
        <a href="#">
          <div className="content">
            <h2>{title}</h2>
            <Rating />
          </div>
        </a>
      </li>);
  }
}

