import { useEffect } from "react";
import { useForm } from "../../hooks/useForm";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ isModalOpen, onClose, isLoading }) {
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    setValues({
      email: "",
      password: "",
    });
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
    >
      <label htmlFor="login-email-input" className="modal__label">
        Email
        <span className="modal__error"></span>
        <input
          type="email"
          className="modal__input"
          name="email"
          id="login-email-input"
          placeholder="Email"
          required
          onChange={handleChange}
          value={values.email}
        />
      </label>
      <label htmlFor="login-password-input" className="modal__label">
        Password
        <span className="modal__error"></span>
        <input
          type="password"
          className="modal__input"
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
