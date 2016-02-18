import React from 'react';
import './_CartList.scss';
import CartTile from '../CartTile/CartTile';

const CartList = (props) => {
  return (<div className="chart-list">
    <h1 className="category-header">Cart For { props.user.name }</h1>
    <ul className="items">
      {
        props.cart.map((cartItem, idx) => (
          <CartTile key={idx} cartItem={cartItem} movies={props.movies} />
        ))
      }
    </ul>
  </div>);
};

CartList.deafultProps = {
  cart: []
};

CartList.propTypes = {
  movies: React.PropTypes.array,
  user: React.PropTypes.object,
  cart: React.PropTypes.array
};

export default CartList;
