import React from 'react';
import _ from 'lodash';

// TODO: Pass in Rating as a prop and draw the right amount of stars. fa-star is filled and fa-star-o is an empty stay
// TODO: Make the stars clickable to save result of rating as state

//Converted to a stateful component as we will be using state.

const MAX_STARS = 5;

export default class Rating extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div className="stars">
              { this.retrieveRating() }
            </div>);
  }

  retrieveRating() {
    return _.map(_.range(MAX_STARS), (idx) => {
      return <i  key={idx} className="fa fa-star"
          onClick={this.updateRating.bind(this)}
          data-rating={idx}/>;
    });
  }

  updateRating() {
    console.log('Rated');
  }
}

Rating.defaultProps = {
  stars: 0
};

Rating.propTypes = {
  stars: React.PropTypes.number
};
