import React from 'react';

export default class Rating extends React.Component {
	constructor(props, ...args) {
		super(props, ...args);
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

