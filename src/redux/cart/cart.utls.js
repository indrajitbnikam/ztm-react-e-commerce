export const addItemToCart = (cartItems, itemToBeAdded) => {
  const existingCartItem = cartItems.find(item => {
    return item.id === itemToBeAdded.id;
  });

  if (existingCartItem) {
    return cartItems.map(cartItem => {
      return cartItem.id === itemToBeAdded.id
      ? {...cartItem, quantity: cartItem.quantity + 1}
      : cartItem;
    })
  }

  return [...cartItems, { ...itemToBeAdded, quantity: 1 }];
};
