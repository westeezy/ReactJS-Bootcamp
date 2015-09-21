import './_MovieDetail.scss';
import React from 'react';

export default class MovieTile extends React.Component {
	constructor(props, ...args) {
		super(props, ...args);
	}

	render() {
		let movie = {};
		return (
			<div className='movie-detail-container'>
				<div className='movie-detail-content'>
					<div className="pull-left">
						<img height='300px' src={'img/' + movie.cover} width='200px'/>
					</div>
					<div className="pull-right">
						<h2>{movie.title}</h2>
						<h3>{movie.year}</h3>
						<p>{movie.description}</p>
						<p>
							<a href="/">
								<i className="fa fa-backward"/>
								<span>  Back</span>
							</a>
						</p>
					</div>
				</div>
			</div>);
	}
}

MovieTile.defaultProps = {
	context: {}
};

MovieTile.propTypes = {
	context: React.PropTypes.object
};
