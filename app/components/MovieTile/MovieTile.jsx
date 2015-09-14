import React from 'react';
import './_MovieTile.scss';
import '../MovieList/_MovieList.scss';

export default class MovieTile extends React.Component {
	constructor(props, ...args) {
		super(props, ...args);
	}

  // TODO: Make Movie Title a variable that gets interpolated
  // TODO: Abstract the stars into a method that returns the JSX
  // TODO: How might we have this function accept the parameters of getStars(filledStars, totalStars)?
  // TODO: How might we abstract Stars into it's own component? (named Rating)

	render() {
		let img = `img/fake${Math.floor(Math.random() * 10) + 1}.jpg`;
		return (
				<div className="movie-list">
	        <ul className="items">
	          <li className="movie-tile-container item">
	            <div className="bg-img" style={{backgroundImage: `url('${img}')`}} />
							<a href="#">
								<div className="content">
									<h2>Movie Title</h2>
									<div className="stars">
											<i className="fa fa-star" />
											<i className="fa fa-star" />
											<i className="fa fa-star" />
											<i className="fa fa-star-o" />
											<i className="fa fa-star-o" />
									</div>
								</div>
							</a>
	          </li>
	        </ul>
	      </div>);
	}
}

