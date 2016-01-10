import React from 'react';
import AppActions from '../../actions/AppActions';

const MAX_STARS = 5;

const Rating = (props) => {
  const updateRating = (e) => {
    e.preventDefault();
    const stars = parseInt(e.target.attributes['data-rating'].value) + 1;
    AppActions.rateMovie(props.title, stars);
  };

  const rating = Array(MAX_STARS)
    .fill(0)
    .map((s, i) => {
      return i < props.stars ?
      <i key={i}
        className="fa fa-star"
        data-rating={i}
        onClick={updateRating}/>
      :
      <i key={i}
        className="fa fa-star-o"
        data-rating={i}
        onClick={updateRating}/>
    });

  return (
    <div className="stars">
      {rating}
    </div>
  );
};

Rating.defaultProps = {
  stars: 0
};

Rating.propTypes = {
  stars: React.PropTypes.number
};

export default Rating;
