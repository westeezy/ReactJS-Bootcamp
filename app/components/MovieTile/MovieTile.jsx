import React from 'react';
import '../MovieList/_MovieList.scss';
import './_MovieTile.scss';

// TODO: Make Movie Title a variable that gets interpolated
// TODO: Abstract the stars into a method that returns the JSX
// TODO: How might we have this function accept the parameters of getStars(filledStars, totalStars)?
// TODO: How might we abstract Stars into it's own component? (named Rating)

let MovieTile = (props) => {
  const img = `img/fake${Math.floor(Math.random() * 10) + 1}.jpg`;
  const rating = Array(5).fill(0).map((s, i) => i < 3 ? <i key={i} className="fa fa-star" /> : <i key={i} className="fa fa-star-o" />);

	return (
	  <li className="movie-tile-container item">
	    <div className="bg-img" style={{backgroundImage: `url('${img}')`}}/>
	    <a href="#">
	      <div className="content">
	        <h2>Movie Title</h2>
	        <div className="stars">
	          { rating }
	        </div>
	      </div>
	    </a>
	  </li>
	);
};

MovieTile.defaultProps = {
  movie: {}
};

MovieTile.propTypes = {
  movie: React.PropTypes.obj
};

export default MovieTile;
