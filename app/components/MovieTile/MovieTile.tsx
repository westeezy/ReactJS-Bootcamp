import * as React from 'react';
import * as _ from 'lodash';
import {IMovieTileState, IMovieTileProps} from './MovieTile.d.ts';
import Rating from '../Rating/Rating.tsx';

export default class MovieTile extends React.Component<IMovieTileProps, IMovieTileState> {
	constructor(props) {
		super(props);
	}

	render() {
		let maxStars:number = 5;
		return (<li className="movie-tile-container item">
				<div className="bg-img"
							style={{'backgroundImage': `url('img/${this.props.movie.cover}')`}}></div>
				<a href="#">
					<div className="content">
						<h2>{this.props.movie.title}</h2>
						<Rating stars={this.props.movie.rating} title={this.props.movie.title} />
					</div>
				</a>
			</li>);
	}
}
