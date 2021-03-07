import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import CartItem from '../cart-item/cart-item.component';
import { CartDropdownContainer, CartItemsContainer, CustomButtonContainer, EmptyMessage } from './cart-dropdown.styles';

const CartDropdown = ({ cartItems, toggleCartDropdown, history }) => (
  <CartDropdownContainer>
    <CartItemsContainer>
      {
        cartItems.length
        ? (cartItems.map(item =>
            <CartItem key={item.id} item={item}/>
          ))
        : (<EmptyMessage className='empty-message'>Your cart is empty</EmptyMessage>)
      }
    </CartItemsContainer>
    <CustomButtonContainer onClick={() => {
      toggleCartDropdown();
      history.push('/checkout');
    }}>
      GO TO CHECKOUT
    </CustomButtonContainer>
  </CartDropdownContainer>
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