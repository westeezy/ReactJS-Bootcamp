import React from 'react';
import './_CartTile.scss';
import MovieStore from '../../stores/MovieStore';
import Rating from '../Rating/Rating';

const findMovieFromAll = (props) => {
  const title = props.cartItem.params.title;
  return MovieStore.getByTitle(title);
};

const CartTile = (props) => {
  const movie = findMovieFromAll(props) || {};
  return (
    <li className="cart-tile">
      <div className="cart-container">
        <div className="image-container">
          <img height="110px" src={`img/${movie.cover}`} width="67px" />
        </div>
        <div className="content-container bold">
          <h2>{movie.title} {`(${movie.year})`}</h2>
          <p>{movie.description}</p>
          <Rating stars={movie.rating ? Number(movie.rating) : 0} />
        </div>
      </div>
    </li>
  );
};

CartTile.defaultProps = {
  cart: {}
};

CartTile.propTypes = {
  cart: React.PropTypes.object
};

export default CartTile;
