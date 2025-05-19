import { useContext, useEffect } from "react";
import { useFormAndValidation } from "../../hooks/useForm";

import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function EditProfileModal({ isModalOpen, onClose, onEditUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, setValues, errors, isValid, resetForm } = useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditUser(values);
  };

  useEffect(() => {
    if (isModalOpen) {
      resetForm({ "name": currentUser?.name, "avatar": currentUser?.avatar});
    }
  }, [isModalOpen, currentUser]);

  return (
    <ModalWithForm
      name="edit-profile"
      onClose={onClose}
      isModalOpen={isModalOpen}
      hasForm={true}
      title="Change profile data"
      buttonText={isLoading ? "Saving..." : "Save changes"}
      onSubmit={handleSubmit}
      formValid={isValid}
    >
      <label htmlFor="edit-profile-name-input" className={`modal__label ${
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
          id="edit-profile-name-input"
          name="name"
          placeholder="Name"
          required
          minLength={2}
          maxLength={40}
          onChange={handleChange}
          value={values.name}
        />
      </label>
      <label htmlFor="edit-profile-avatar-input" className={`modal__label ${
          errors.avatar ? "modal__label_type_error" : ""
        }`}>
        Avatar URL*
        <span className={`modal__error ${
            errors.avatar ? "modal__error_visible" : ""
          }`}>&nbsp;{errors.avatar && `(${errors.avatar})`}</span>
        <input
          type="url"
          className={`modal__input ${
            errors.avatar ? "modal__input_type_error" : ""
          }`}
          id="edit-profile-avatar-input"
          name="avatar"
          placeholder="Image URL"
          required
          onChange={handleChange}
          value={values.avatar}
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
