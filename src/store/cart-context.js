import React from 'react';

const CartContext = React.createContext({
  items: [],
  total: 0,
  addItem: () => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

export default CartContext;
