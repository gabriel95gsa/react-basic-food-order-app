import React, { useRef, useState } from "react";
import styled from "styled-components";
import Input from "../../UI/Input";

const StyledMealItemForm = styled.form`
  text-align: right;

  & button {
    font: inherit;
    cursor: pointer;
    background-color: #8a2b06;
    border: 1px solid #8a2b06;
    color: white;
    padding: 0.25rem 2rem;
    border-radius: 20px;
    font-weight: bold;
  }

  & button:hover,
  & button:active {
    background-color: #641e03;
    border-color: #641e03;
  }
`;

const MealItemForm = props => {
  const [formIsValid, setFormIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = event => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setFormIsValid(false);

      return;
    }

    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <StyledMealItemForm onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1'
        }} />
      <button>+ Add</button>
      {!formIsValid && <p>Please enter a valid amount!</p>}
    </StyledMealItemForm>
  );
};

export default MealItemForm;
