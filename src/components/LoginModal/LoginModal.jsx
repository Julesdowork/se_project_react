import { useEffect } from "react";
import { useFormAndValidation } from "../../hooks/useForm";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({
  isModalOpen,
  onClose,
  isLoading,
  handleLogin,
  setActiveModal,
}) {
  const initialFormValues = { email: "", password: "" };
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation(initialFormValues);

  const resetLoginForm = () => {
    resetForm({ email: "", password: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(values, resetLoginForm);
  };

  useEffect(() => {
    resetLoginForm();
  }, [isModalOpen]);

  return (
    <ModalWithForm
      name="login"
      onClose={onClose}
      isModalOpen={isModalOpen}
      hasForm={true}
      title="Log in"
      buttonText={isLoading ? "Logging in..." : "Log in"}
      onSubmit={handleSubmit}
      formValid={isValid}
      altBtnText={"or Sign up"}
      altBtnHandler={() => setActiveModal("register")}
    >
      <label
        htmlFor="login-email-input"
        className={`modal__label ${
          errors.email ? "modal__label_type_error" : ""
        }`}
      >
        Email
        <span
          className={`modal__error ${
            errors.email ? "modal__error_visible" : ""
          }`}
        >
          &nbsp;{errors.email && `(${errors.email})`}
        </span>
        <input
          type="email"
          className={`modal__input ${
            errors.email ? "modal__input_type_error" : ""
          }`}
          name="email"
          id="login-email-input"
          placeholder="Email"
          required
          onChange={handleChange}
          value={values.email}
        />
      </label>
      <label
        htmlFor="login-password-input"
        className={`modal__label ${
          errors.password ? "modal__label_type_error" : ""
        }`}
      >
        Password
        <span
          className={`modal__error ${
            errors.password ? "modal__error_visible" : ""
          }`}
        >
          &nbsp;{errors.password && `(${errors.password})`}
        </span>
        <input
          type="password"
          className={`modal__input ${
            errors.password ? "modal__input_type_error" : ""
          }`}
          name="password"
          id="login-password-input"
          placeholder="Password"
          required
          onChange={handleChange}
          value={values.password}
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
