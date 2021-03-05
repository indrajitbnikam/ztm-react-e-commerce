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

export const removeItemFromCart = (cartItems, itemToBeRemoved) => {
  const existingCartItem = cartItems.find(item => {
    return item.id === itemToBeRemoved.id;
  });

  if (existingCartItem.quantity === 1) {
    return cartItems.filter(item => item.id !== itemToBeRemoved.id);
  }

  return cartItems.map(item => {
    return item.id === itemToBeRemoved.id
      ? {...item, quantity: item.quantity - 1}
      : item;
  })
}
