import React, { useContext } from "react";
import styled from "styled-components";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";

const StyledMealItem = styled.li`
  display: flex;
  justify-content: space-between;
  margin: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ccc;

  & h3 {
    margin: 0 0 0.25rem 0;
  }
`;

const StyledMealItemDescription = styled.div`
  font-style: italic;
`;

const StyledMealItemPrice = styled.div`
  margin-top: 0.25rem;
  font-weight: bold;
  color: #ad5502;
  font-size: 1.25rem;
`;

const MealItem = props => {
  const cartContext = useContext(CartContext);

  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = amount => {
    cartContext.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price
    });
  };

  return (
    <StyledMealItem>
      <div>
        <h3>{props.name}</h3>
        <StyledMealItemDescription>{props.description}</StyledMealItemDescription>
        <StyledMealItemPrice>{price}</StyledMealItemPrice>
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </StyledMealItem>
  );
};

export default MealItem;
