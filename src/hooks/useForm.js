import { useState, useCallback } from "react";

export function useFormAndValidation(initialFormValues) {
  const [values, setValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (evt) => {
    const { value, name } = evt.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: evt.target.validationMessage });
    setIsValid(evt.target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = initialFormValues, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    handleChange,
    setValues,
    errors,
    isValid,
    resetForm,
    setIsValid,
  };
}
