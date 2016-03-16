import React from 'react';
import './_CartList.scss';
import CartTile from '../CartTile/CartTile';

const CartList = (props) => {
  return (
    <div className="cart-list">
      <h1 className="category-header">Cart For { props.user.name }</h1>
      <ul className="items">
        {
          props.cart.map((cartItem, idx) => {
            return <CartTile key={idx} movie={cartItem} />;
          })
        }
      </ul>
    </div>
  );
};

CartList.deafultProps = {
  cart: []
};

CartList.propTypes = {
  user: React.PropTypes.object,
  cart: React.PropTypes.array
};

export default CartList;
