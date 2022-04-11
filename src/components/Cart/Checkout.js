import { useRef, useState } from "react";
import CheckoutInput from "../../hooks/checkout-input";

import classes from "./Checkout.module.css";

// const isEmpty = (value) => value.trim() === "";
// const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: enteredNameHasError,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
    reset: resetName,
  } = CheckoutInput((enteredValue) => enteredValue.trim() !== "");

  const {
    value: enteredStreet,
    isValid: enteredStreetIsValid,
    hasError: enteredStreetHasError,
    valueChangeHandler: streetChangeHandler,
    valueBlurHandler: streetBlurHandler,
    reset: resetStreet,
  } = CheckoutInput((enteredValue) => enteredValue.trim() !== "");

  const {
    value: enteredCity,
    isValid: enteredCityIsValid,
    hasError: enteredCityHasError,
    valueChangeHandler: cityChangeHandler,
    valueBlurHandler: cityBlurHandler,
    reset: resetCity,
  } = CheckoutInput((enteredValue) => enteredValue.trim() !== "");

  const {
    value: enteredPostal,
    isValid: enteredPostalIsValid,
    hasError: enteredPostalHasError,
    valueChangeHandler: postalChangeHandler,
    valueBlurHandler: postalBlurHandler,
    reset: resetPostal,
  } = CheckoutInput(
    (enteredValue) =>
      enteredValue.trim() !== "" && enteredValue.trim().length === 5
  );

  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  // const nameInputRef = useRef();
  // const streetInputRef = useRef();
  // const postalInputRef = useRef();
  // const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    // const enteredName = nameInputRef.current.value;
    // const enteredStreet = streetInputRef.current.value;
    // const enteredPostal = postalInputRef.current.value;
    // const enteredCity = cityInputRef.current.value;

    // const enteredNameIsValid = !isEmpty(enteredName);
    // const enteredStreetIsValid = !isEmpty(enteredStreet);
    // const enteredCityIsValid = !isEmpty(enteredCity);
    // const enteredPostalIsValid = isFiveChars(enteredPostal);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostal,
    });
  };

  const nameControlClasses = `${classes.control} ${
    !enteredNameHasError ? "" : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    !enteredStreetHasError ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    !enteredCityHasError ? "" : classes.invalid
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    !enteredPostalHasError ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
        {enteredCityHasError && <p>Please enter a valid Name!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
        />
        {enteredStreetHasError && <p>Please enter a valid Street!</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          onChange={postalChangeHandler}
          onBlur={postalBlurHandler}
        />
        {enteredPostalHasError && (
          <p>Please enter a valid postal code (5 characters long)!</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
        />
        {enteredCityHasError && <p>Please enter a valid City!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
