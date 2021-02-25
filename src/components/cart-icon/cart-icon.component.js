import React from 'react';
import { connect } from 'react-redux';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

import './cart-icon.styles.scss';

const CartIcon = ({ cartItemQuanitity, toggleCartHidden }) => (
  <div className='cart-icon' onClick={toggleCartHidden}>
    <ShoppingIcon className='shopping-icon'/>
    <span className='item-count'>{cartItemQuanitity}</span>
  </div>
)

const getTotalCartItemQuantity = cartItems => {
  return cartItems.reduce((totalQuantity, item) => {
    return totalQuantity + item.quantity
  }, 0)
}

const mapStateToProps = ({ cart: { cartItems } }) => ({
  cartItemQuanitity: getTotalCartItemQuantity(cartItems)
})

const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
