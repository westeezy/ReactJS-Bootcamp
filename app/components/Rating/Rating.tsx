import * as React from 'react';
import * as _ from 'lodash';
import AppActions from '../../actions/AppActions';
import {IRatingState, IRatingProps} from './Rating.d.ts';

const MAX_STARS:number = 5;

export default class Rating extends React.Component<IRatingProps, IRatingState> {
	constructor(props) {
		super(props);
		this.state = {
			stars: props.stars
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			stars: nextProps.stars
		});
	}

	render() {
		return (
            <div className="stars">
							{
								this.retrieveRating()
							}
						</div>
          );
	}

	retrieveRating() {
		return _.map(_.range(MAX_STARS), (idx) => {
			return idx < this.state.stars ?
							<i 	key={idx} className="fa fa-star"
									data-rating={idx}
									onClick={this.updateRating.bind(this)}/>
							:
							<i 	key={idx} className="fa fa-star-o"
									data-rating={idx}
									onClick={this.updateRating.bind(this)}/>;
			});
	}

	updateRating(e) {
		e.preventDefault();
		let stars = parseInt(e.target.attributes['data-rating'].value) + 1;
		this.setState({stars});
		AppActions.rateMovie(this.props.title, stars);
	}
}
