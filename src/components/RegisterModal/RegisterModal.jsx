import { useEffect } from "react";
import { useForm } from "../../hooks/useForm";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({ isModalOpen, onClose, isLoading }) {
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
    name: "",
    avatarUrl: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    setValues({
      email: "",
      password: "",
      name: "",
      avatarUrl: "",
    });
  }, [isModalOpen]);

  return (
    <ModalWithForm
      name="register"
      onClose={onClose}
      isModalOpen={isModalOpen}
      hasForm={true}
      title="Sign up"
      buttonText={isLoading ? "Registering..." : "Next"}
      onSubmit={handleSubmit}
    >
      <label htmlFor="register-email-input" className="modal__label">
        Email*
        <span className="modal__error"></span>
        <input
          type="email"
          className="modal__input"
          name="email"
          id="register-email-input"
          placeholder="Email"
          required
          onChange={handleChange}
          value={values.email}
        />
      </label>
      <label htmlFor="register-password-input" className="modal__label">
        Password*
        <span className="modal__error"></span>
        <input
          type="password"
          className="modal__input"
          name="password"
          id="register-password-input"
          placeholder="Password"
          required
          onChange={handleChange}
          value={values.password}
        />
      </label>
      <label htmlFor="register-name-input" className="modal__label">
        Name
        <span className="modal__error"></span>
        <input
          type="text"
          className="modal__input"
          name="name"
          id="register-name-input"
          placeholder="Name"
          minLength={2}
          maxLength={40}
          onChange={handleChange}
          value={values.name}
        />
      </label>
      <label htmlFor="register-avatarUrl-input" className="modal__label">
        Avatar URL
        <span className="modal__error"></span>
        <input
          type="url"
          className="modal__input"
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
