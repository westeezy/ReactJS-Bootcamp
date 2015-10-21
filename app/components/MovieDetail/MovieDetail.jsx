import './_MovieDetail.scss';
import React from 'react';
import _ from 'lodash';
import MovieStore from '../../stores/MovieStore';

export default class MovieTile extends React.Component {
	constructor(props, ...args) {
		super(props, ...args);
	}

	render() {
		let movie = this.findMovieFromAll() || {};
		return (
			<div className='movie-detail-container'>
				<div className='movie-detail-content'>
					<div className="pull-left">
						<img height='300px' src={'img/' + movie.cover} width='200px'/>
					</div>
					<div className="pull-right">
						<h2 className="title">{movie.title}</h2>
						<h3 className="year">{movie.year}</h3>
						<p className="description">{movie.description}</p>
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

	findMovieFromAll() {
		let title = _.get(this.props.context, 'params.title', '');
		return MovieStore.getByTitle(title);
	}
}

MovieTile.defaultProps = {
	context: {}
};

MovieTile.propTypes = {
	context: React.PropTypes.object
};
