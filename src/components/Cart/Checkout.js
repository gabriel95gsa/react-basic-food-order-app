import { useRef, useState } from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
  margin: 1rem 0;
  height: 19rem;
  overflow: auto;
`;

const StyledFormControl = styled.div`
  margin-bottom: 0.5rem;

  label {
    color: ${(props) => (props.invalid ? '#ca3e51' : 'black')};
    font-weight: bold;
    margin-bottom: 0.25rem;
    display: block;
  }

  input {
    font: inherit;
    border: 1px solid ${(props) => (props.invalid ? '#aa0b20' : '#ccc')};
    background-color: ${(props) => (props.invalid ? '#ffeff1' : 'transparent')};
    border-radius: 4px;
    width: 20rem;
    max-width: 100%;
  }
`;

const StyledFormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;

  button {
    font: inherit;
    color: #5a1a01;
    cursor: pointer;
    background-color: transparent;
    border: none;
    border-radius: 25px;
    padding: 0.5rem 2rem;
  }

  button:hover,
  button:active {
    background-color: #ffe6dc;
  }

  .submit {
    border: 1px solid #5a1a01;
    background-color: #5a1a01;
    color: white;
  }

  .submit:hover,
  .submit:active {
    background-color: #7a2706;
  }
`;

const isEmpty = (value) => value.trim() === '';
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const nameInput = useRef();
  const streetInput = useRef();
  const postalCodeInput = useRef();
  const cityInput = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInput.current.value;
    const enteredStreet = streetInput.current.value;
    const enteredPostalCode = postalCodeInput.current.value;
    const enteredCity = cityInput.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

    setFormInputsValidity({
      name: enteredCityIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
    });

    const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalCodeIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode,
    });
  };

  return (
    <StyledForm onSubmit={confirmHandler}>
      <StyledFormControl invalid={!formInputsValidity.name ? true : false}>
        <label htmlFor="name">Your name</label>
        <input ref={nameInput} type="text" id="name" />
        {!formInputsValidity.name && <p>Please enter a valid name.</p>}
      </StyledFormControl>
      <StyledFormControl invalid={!formInputsValidity.street ? true : false}>
        <label htmlFor="street">Street</label>
        <input ref={streetInput} type="text" id="street" />
        {!formInputsValidity.street && <p>Please enter a valid street.</p>}
      </StyledFormControl>
      <StyledFormControl invalid={!formInputsValidity.postalCode ? true : false}>
        <label htmlFor="postal">Postal code</label>
        <input ref={postalCodeInput} type="text" id="postal" />
        {!formInputsValidity.postalCode && <p>Please enter a valid postal code (5 characters long!).</p>}
      </StyledFormControl>
      <StyledFormControl invalid={!formInputsValidity.city ? true : false}>
        <label htmlFor="city">City</label>
        <input ref={cityInput} type="text" id="city" />
        {!formInputsValidity.city && <p>Please enter a valid city.</p>}
      </StyledFormControl>
      <StyledFormActions>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className="submit">Confirm</button>
      </StyledFormActions>
    </StyledForm>
  );
};

export default Checkout;
