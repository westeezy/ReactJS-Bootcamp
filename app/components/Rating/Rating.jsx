import React from 'react';

const MAX_STARS = 5;

export default class Rating extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
		  <div className="stars">
		    <i className="fa fa-star"/>
		    <i className="fa fa-star"/>
		    <i className="fa fa-star"/>
		    <i className="fa fa-star-o"/>
		    <i className="fa fa-star-o"/>
			</div>
		);
	}
}

