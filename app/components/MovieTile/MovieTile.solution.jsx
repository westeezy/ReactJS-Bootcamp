import React from 'react';
import './_MovieTile.scss';
import '../MovieList/_MovieList.scss';

import Rating from '../Rating/Rating.solution.jsx';

export default class MovieTile extends React.Component {
	constructor(props, ...args) {
		super(props, ...args);
	}

	render() {
		const img = `img/fake${Math.floor(Math.random() * 10) + 1}.jpg`;
    const title = 'Sleepless in Seattle';

		return (
				<div className="movie-list">
	        <ul className="items">
	          <li className="movie-tile-container item">
	            <div className="bg-img" style={{backgroundImage: `url('${img}')`}} />
							<a href="#">
								<div className="content">
									<h2>{title}</h2>

                 { this.retrieveRating(3) /*This for the internal approach*/ }

                  <Rating />{/*For the Componentized approach*/}

								</div>
							</a>
	          </li>
	        </ul>
	      </div>);
	}

  retrieveRating(filledStars, totalStars=5) {
    return Array(totalStars).fill(0).map((stars, idx) => {
      return filledStars > idx ?
              <i key={idx} className="fa fa-star" />
            : <i key={idx} className="fa fa-star-o" />;
    });
  }
}

