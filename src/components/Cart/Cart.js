import React, { useContext } from "react";
import styled from "styled-components";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

const StyledCartItems = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 20rem;
  overflow: auto;
`;

const StyledCartTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 1.5rem;
  margin: 1rem 0;
`;

const StyledCartActions = styled.div`
  text-align: right;

  & button {
    font: inherit;
    cursor: pointer;
    background-color: transparent;
    border: 1px solid #8a2b06;
    padding: 0.5rem 2rem;
    border-radius: 25px;
    margin-left: 1rem;
  }

  & button:hover,
  & button:active {
    background-color: #5a1a01;
    border-color: #5a1a01;
    color: white;
  }

  & .button--alt {
    color: #8a2b06;
  }

  & .button {
    background-color: #8a2b06;
    color: white;
  }
`;

const Cart = props => {
  const cartContext = useContext(CartContext);

  const cartItemRemoveHandler = id => {
    cartContext.removeItem(id);
  };

  const cartItemAddHandler = item => {
    cartContext.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <StyledCartItems>
      {cartContext.items.map(item => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </StyledCartItems>
  );

  const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <StyledCartTotal>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </StyledCartTotal>
      <StyledCartActions>
        <button className="button--alt" onClick={props.onClose}>Close</button>
        {cartContext.items.length > 0 && <button className="button">Order</button>}
      </StyledCartActions>
    </Modal>
  );
};

export default Cart;
