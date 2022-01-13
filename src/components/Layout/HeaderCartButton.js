import React, { useContext, useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

const bump = keyframes`
  0% {
    transform: scale(1);
  }
  10% {
    transform: scale(0.9);
  }
  30% {
    transform: scale(1.1);
  }
  50% {
    transform: scale(1.15);
  }
  100% {
    transform: scale(1);
  }
`;

const bumpAnimation = css`
  ${bump} 300ms ease-out;
`;

const StyledHeaderCartButton = styled.button`
  cursor: pointer;
  font: inherit;
  border: none;
  background-color: #4d1601;
  color: white;
  padding: 0.75rem 3rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 25px;
  font-weight: bold;

  &:hover,
  &:active {
    background-color: #2c0d00;
  }

  animation: ${props => props.isHighlighted ? bumpAnimation : 'none'};
`;

const StyledHeaderCartIcon = styled.span`
  width: 1.35rem;
  height: 1.35rem;
  margin-right: 0.5rem;
`;

const StyledHeaderBadge = styled.span`
  background-color: #b94517;
  padding: 0.25rem 1rem;
  border-radius: 25px;
  margin-left: 1rem;
  font-weight: bold;

  $(StyledHeaderCartButton):hover &,
  $(StyledHeaderCartButton):active & {
    background-color: #92320c;
  }
`;

const HeaderCartButton = props => {
  const [btnIsHighighted, setBtnIsHighlighted] = useState(false);

  const cartContext = useContext(CartContext);

  const numberOfCartItems = cartContext.items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0);

  useEffect(() => {
    if (cartContext.items.length === 0) {
      return;
    }
    
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [cartContext.items]);

  return (
    <StyledHeaderCartButton isHighlighted={btnIsHighighted} onClick={props.onClick}>
      <StyledHeaderCartIcon>
        <CartIcon />
      </StyledHeaderCartIcon>
      <span>Your Cart</span>
      <StyledHeaderBadge>{numberOfCartItems}</StyledHeaderBadge>
    </StyledHeaderCartButton>
  );
};

export default HeaderCartButton;
