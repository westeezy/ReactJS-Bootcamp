import React from 'react';
import './_MovieTile.scss';
import Rating from '../Rating/Rating';


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
						<div className="stars">
							<Rating stars={parseInt(this.props.movie.rating)} title={this.props.movie.title}/>
						</div>
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
