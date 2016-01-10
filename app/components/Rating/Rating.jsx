import React from 'react';

const MAX_STARS = 5;

const Rating = (props) => {
  const rating = Array(MAX_STARS)
                .fill(0)
                .map((s, i) => {
                  return i < props.stars ?
                    <i key={i} className="fa fa-star" />
                      : <i key={i} className="fa fa-star-o" />
                });

  return (<div className="stars">{rating}</div>);
};

Rating.defaultProps = {
  stars: 0
};

Rating.propTypes = {
  stars: React.PropTypes.number
};

export default Rating;
