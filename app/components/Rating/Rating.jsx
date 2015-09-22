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
			return idx < this.props.stars ?
							<i key={idx} className="fa fa-star"
									data-rating={idx}/>
							:
							<i key={idx} className="fa fa-star-o"
									data-rating={idx}/>;
			});
	}
}


Rating.defaultProps = {
	stars: 0
};

Rating.propTypes = {
	stars: React.PropTypes.number
};
