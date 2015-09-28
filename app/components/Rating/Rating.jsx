import React from 'react';
import _ from 'lodash';

const MAX_STARS = 5;

/*
 * 1. Set the default state of stars to be the prop passed in - Presenter
 * 2. Set up updateRating method to update the star count and rerender - Audience
 */

export default class Rating extends React.Component {
	constructor(props, ...args) {
		super(props, ...args);
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
		return (<div className="stars">
							{
								this.retrieveRating()
							}
						</div>);
	}

	retrieveRating() {
		return _.map(_.range(MAX_STARS), (idx) => {
			return idx < this.state.stars ?
							<i 	key={idx} className="fa fa-star"
									onClick={this.updateRating.bind(this)}
									data-rating={idx}/>
							:
							<i 	key={idx} className="fa fa-star-o"
									onClick={this.updateRating.bind(this)}
									data-rating={idx}/>;
			});
	}

	updateRating(e) {
		e.preventDefault();
		let stars = parseInt(e.target.attributes['data-rating'].value) + 1;
		this.setState({stars});
	}
}


Rating.defaultProps = {
	stars: 0
};

Rating.propTypes = {
	stars: React.PropTypes.number
};
