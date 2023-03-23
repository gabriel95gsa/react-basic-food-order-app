import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

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

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartContext = useContext(CartContext);

  const cartItemRemoveHandler = (id) => {
    cartContext.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartContext.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);

    await fetch('https://react-food-order-app-8f357-default-rtdb.firebaseio.com/orders.json', {
      method: 'POST',
      body: JSON.stringify({ user: userData, orderedItems: cartContext.items }),
    });

    setIsSubmitting(false);
    setDidSubmit(true);
    cartContext.clearCart();
  };

  const cartItems = (
    <StyledCartItems>
      {cartContext.items.map((item) => (
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

  const cartModalContent = (
    <>
      {cartItems}
      <StyledCartTotal>
        <span>Total Amount</span>
        <span>{`$${cartContext.totalAmount.toFixed(2)}`}</span>
      </StyledCartTotal>
      {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}
      {!isCheckout && (
        <StyledCartActions>
          <button className="button--alt" onClick={props.onClose}>
            Close
          </button>
          {cartContext.items.length > 0 && (
            <button className="button" onClick={orderHandler}>
              Order
            </button>
          )}
        </StyledCartActions>
      )}
    </>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = (
    <>
      <p>Successfully sent the order!</p>
      <StyledCartActions>
        <button className="button" onClick={props.onClose}>
          Close
        </button>
      </StyledCartActions>
    </>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
