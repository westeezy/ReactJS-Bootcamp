import React from 'react';
import _ from 'lodash';
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
				<a href={'/movies/' + this.props.movie.title}>
					<div className="content">
						<h2>{this.props.movie.title}</h2>
            <Rating stars={_.get(this.props, 'movie.rating')}
                    title={_.get(this.props, 'movie.title')}/>
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
