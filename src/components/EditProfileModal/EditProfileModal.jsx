import { useContext, useEffect } from "react";
import { useForm } from "../../hooks/useForm";

import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function EditProfileModal({ isModalOpen, onClose, onEditUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, setValues } = useForm({
    name: "",
    avatar: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditUser(values);
  };

  useEffect(() => {
    if (isModalOpen) {
      setValues({
        name: currentUser.name,
        avatar: currentUser.avatar,
      });
    }
  }, [isModalOpen, currentUser, currentUser]);

  return (
    <ModalWithForm
      name="edit-profile"
      onClose={onClose}
      isModalOpen={isModalOpen}
      hasForm={true}
      title="Change profile data"
      buttonText={isLoading ? "Saving..." : "Save changes"}
      onSubmit={handleSubmit}
    >
      <label htmlFor="edit-profile-name-input" className="modal__label">
        Name*
        <span className="modal__error"></span>
        <input
          type="text"
          className="modal__input"
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
      <label htmlFor="edit-profile-avatar-input" className="modal__label">
        Avatar URL*
        <span className="modal__error"></span>
        <input
          type="url"
          className="modal__input"
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
