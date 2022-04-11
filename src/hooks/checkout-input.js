import { useState } from "react";

const CheckoutInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const enteredValueisValid = validateValue(enteredValue);

  const hasError = !enteredValueisValid && isTouched;

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const valueBlurHandler = (event) => {
    setIsTouched(true);
  };

  const reset = () => {
      setEnteredValue("");
      setIsTouched(false);
  }

  return {
    value: enteredValue,
    isValid: enteredValueisValid,
    hasError,
    valueChangeHandler,
    valueBlurHandler,
    reset,
  };
};

export default CheckoutInput;
