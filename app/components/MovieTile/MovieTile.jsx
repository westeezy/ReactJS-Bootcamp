import React from 'react';
import './_MovieTile.scss';
import '../MovieList/_MovieList.scss';
import Stars from './Stars';

export default class MovieTile extends React.Component {
	constructor(props, ...args) {
		super(props, ...args);
	}

	/*
		1. With that in mind how might we break down a Twitter Feed into different components
		2. Make Movie Title a variable
		3. Abstract the stars into a method that returns the JSX
		4. How might we have this function accept the parameters of getStars(filledStars, totalStars)
	*/
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
