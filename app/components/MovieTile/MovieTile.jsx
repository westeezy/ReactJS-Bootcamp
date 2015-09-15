import React from 'react';
import './_MovieTile.scss';
import '../MovieList/_MovieList.scss';
import Stars from './Stars';

const starCount = 5;

export default class MovieTile extends React.Component {
	constructor(...args) {
		super(...args);
	}

  render() {
    let img = `img/fake${Math.floor(Math.random() * 10) + 1}.jpg`;
    let title = 'Burtons Movie';
		return (
				<div className="movie-list">
	        <ul className="items">
	          <li className="movie-tile-container item">
	            <div className="bg-img" style={{backgroundImage: `url('${img}')`}} />
							<a href="#">
								<div className="content">
                  <h2> {title} </h2>
                  <Stars />
                  <div className="stars">
                    {this._stars()}
                  </div>
							</div>
							</a>
	          </li>
	        </ul>
	      </div>);
  }

  _stars(totalStars=starCount) {
    return Array(totalStars).fill(0).map((stars, idx) => {
      return <i key={idx} className="fa fa-star" />;
    });
  }
}
