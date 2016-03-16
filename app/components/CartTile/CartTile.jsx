import React from 'react';
import './_CartTile.scss';
import Rating from '../Rating/Rating';

const CartTile = (props) => {
  const movie = props.movie;
  return (
    <li className="cart-tile">
      <div className="cart-container">
        <div className="image-container">
          <img height="110px" src={`img/${movie.cover}`} width="67px" />
        </div>
        <div className="content-container bold">
          <h2>{movie.title} {`(${movie.year})`}</h2>
          <p>{movie.description}</p>
          <Rating stars={movie.rating ? Number(movie.rating) : 0} title={movie.title} />
        </div>
      </div>
    </li>
  );
};

CartTile.defaultProps = {
  cart: {}
};

CartTile.propTypes = {
  cart: React.PropTypes.object,
  movie: React.PropTypes.object
};

export default CartTile;
