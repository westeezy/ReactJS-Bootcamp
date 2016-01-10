import React from 'react';
import AppActions from '../../actions/AppActions';

const MAX_STARS = 5;

export default class Rating extends React.Component {
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
		return (<div className="stars">
			{
				this.retrieveRating()
			}
		</div>);
	}

	retrieveRating() {
	  return Array(MAX_STARS).fill(0).map((s, idx) => {
			return idx < this.state.stars ?
				<i 	key={idx} className="fa fa-star"
					onClick={this.updateRating.bind(this)}
					data-rating={idx}/>
				: <i key={idx} className="fa fa-star-o"
						onClick={this.updateRating.bind(this)}
						data-rating={idx}/>;
		});
	}

	updateRating(e) {
		e.preventDefault();
		let stars = parseInt(e.target.attributes['data-rating'].value) + 1;
		this.setState({stars});
		AppActions.rateMovie(this.props.title, stars);
	}
}

Rating.defaultProps = {
	stars: 0,
	title: ''
};

Rating.propTypes = {
	stars: React.PropTypes.number,
	title: React.PropTypes.string
};
