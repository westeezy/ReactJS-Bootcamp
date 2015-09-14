import React from 'react';

// Introduction to stateless component syntax
// This is a good example of a 'dumb' component

let Rating = () => {
  const totalStars = 5;
  const starMarkup = Array(totalStars).fill(0).map((stars, idx) => {
    return <i key={idx} className="fa fa-star" />;
  });

  return (
    <div className="stars">
      {
        starMarkup /*Notice how similar to MovieTile we can interpolate the value*/
      }
    </div>
  );

};

export default Rating;
