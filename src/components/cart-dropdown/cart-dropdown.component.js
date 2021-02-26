import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import CartItem from '../cart-item/cart-item.component';
import CustomButton from '../custom-button/custom-button.component';

import './cart-dropdown.styles.scss';

const CartDropdown = ({ cartItems, toggleCartDropdown, history }) => (
  <div className='cart-dropdown'>
    <div className='cart-items'>
      {
        cartItems.length
        ? (cartItems.map(item =>
            <CartItem key={item.id} item={item}/>
          ))
        : (<span className='empty-message'>Your cart is empty</span>)
      }
    </div>
    <CustomButton onClick={() => {
      toggleCartDropdown();
      history.push('/checkout');
    }}>
      GO TO CHECKOUT
    </CustomButton>
  </div>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
});

const mapDispatchToProps = dispatch => ({
  toggleCartDropdown: () => dispatch(toggleCartHidden())
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CartDropdown)
);