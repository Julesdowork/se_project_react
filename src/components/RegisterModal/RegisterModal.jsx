import { useEffect } from "react";
import { useFormAndValidation } from "../../hooks/useForm";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({
  isModalOpen,
  onClose,
  isLoading,
  handleRegistration,
}) {
  const { values, handleChange, setValues, errors, isValid, resetForm } = useFormAndValidation();

  const resetRegistrationForm = () => {
    resetForm({ email: "", password: "", name: "", avatarUrl: "" });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(values, resetRegistrationForm);
  };

  // useEffect(() => 
  //   setValues({
  //     email: "",
  //     password: "",
  //     name: "",
  //     avatarUrl: "",
  //   })
  // , [isModalOpen]);

  return (
    <ModalWithForm
      name="register"
      onClose={onClose}
      isModalOpen={isModalOpen}
      hasForm={true}
      title="Sign up"
      buttonText={isLoading ? "Registering..." : "Next"}
      onSubmit={handleSubmit}
      formValid={isValid}
    >
      <label htmlFor="register-email-input" className={`modal__label ${
          errors.email ? "modal__label_type_error" : ""
        }`}>
        Email*
        <span className={`modal__error ${
            errors.email ? "modal__error_visible" : ""
          }`}>&nbsp;{errors.email && `(${errors.email})`}</span>
        <input
          type="email"
          className={`modal__input ${
            errors.email ? "modal__input_type_error" : ""
          }`}
          name="email"
          id="register-email-input"
          placeholder="Email"
          required
          onChange={handleChange}
          value={values.email}
        />
      </label>
      <label htmlFor="register-password-input" className={`modal__label ${
          errors.password ? "modal__label_type_error" : ""
        }`}>
        Password*
        <span className={`modal__error ${
            errors.password ? "modal__error_visible" : ""
          }`}>&nbsp;{errors.password && `(${errors.password})`}</span>
        <input
          type="password"
          className={`modal__input ${
            errors.password ? "modal__input_type_error" : ""
          }`}
          name="password"
          id="register-password-input"
          placeholder="Password"
          required
          onChange={handleChange}
          value={values.password}
        />
      </label>
      <label htmlFor="register-name-input" className={`modal__label ${
          errors.name ? "modal__label_type_error" : ""
        }`}>
        Name*
        <span className={`modal__error ${
            errors.name ? "modal__error_visible" : ""
          }`}>&nbsp;{errors.name && `(${errors.name})`}</span>
        <input
          type="text"
          className={`modal__input ${
            errors.name ? "modal__input_type_error" : ""
          }`}
          name="name"
          id="register-name-input"
          placeholder="Name"
          minLength={2}
          maxLength={40}
          onChange={handleChange}
          value={values.name}
        />
      </label>
      <label htmlFor="register-avatarUrl-input" className={`modal__label ${
          errors.avatarUrl ? "modal__label_type_error" : ""
        }`}>
        Avatar URL*
        <span className={`modal__error ${
            errors.avatarUrl ? "modal__error_visible" : ""
          }`}>&nbsp;{errors.avatarUrl && `(${errors.avatarUrl})`}</span>
        <input
          type="url"
          className={`modal__input ${
            errors.avatarUrl ? "modal__input_type_error" : ""
          }`}
          name="avatarUrl"
          id="register-avatarUrl-input"
          placeholder="Avatar URL"
          onChange={handleChange}
          value={values.avatarUrl}
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
