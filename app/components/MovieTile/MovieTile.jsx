import React from 'react';
import Rating from '../Rating/Rating';
import './_MovieTile.scss';

export default class MovieTile extends React.Component {
	constructor(props, ...args) {
		super(props, ...args);
	}

	render() {
		return (<li className="movie-tile-container item">
				<div className="bg-img"
							style={{'backgroundImage': `url('img/${this.props.movie.cover}')`}}></div>
				<a href="#">
					<div className="content">
						<h2>{this.props.movie.title}</h2>
						<Rating stars={this.props.movie.rating} />
					</div>
				</a>
			</li>);
	}
}


MovieTile.defaultProps = {
	movie: {}
};

MovieTile.propTypes = {
	movie: React.PropTypes.object
};
