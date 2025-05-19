import { useEffect } from "react";
import { useFormAndValidation } from "../../hooks/useForm";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({ isModalOpen, onClose, onAddItem, isLoading }) {
  const { values, handleChange, setValues, errors, isValid, resetForm } =
    useFormAndValidation();

  const resetAddItemForm = () => {
    resetForm({ name: "", imageUrl: "", weather: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(values, resetAddItemForm);
  };

  useEffect(() => setValues({ weather: "hot" }), [isModalOpen]);

  return (
    <ModalWithForm
      name="add-garment"
      onClose={onClose}
      isModalOpen={isModalOpen}
      hasForm={true}
      title="New garment"
      buttonText={isLoading ? "Adding..." : "Add garment"}
      onSubmit={handleSubmit}
      formValid={isValid}
    >
      <label
        htmlFor="garment-name-input"
        className={`modal__label ${
          errors.name ? "modal__label_type_error" : ""
        }`}
      >
        Name
        <span
          className={`modal__error ${
            errors.name ? "modal__error_visible" : ""
          }`}
        >
          &nbsp;{errors.name && `(${errors.name})`}
        </span>
        <input
          type="text"
          className={`modal__input ${
            errors.name ? "modal__input_type_error" : ""
          }`}
          id="garment-name-input"
          name="name"
          placeholder="Name"
          required
          minLength={2}
          maxLength={40}
          onChange={handleChange}
          value={values.name}
        />
      </label>
      <label
        htmlFor="garment-imageUrl-input"
        className={`modal__label ${
          errors.imageUrl ? "modal__label_type_error" : ""
        }`}
      >
        Image
        <span
          className={`modal__error ${
            errors.imageUrl ? "modal__error_visible" : ""
          }`}
        >
          &nbsp;{errors.imageUrl && `(${errors.imageUrl})`}
        </span>
        <input
          type="url"
          className={`modal__input ${
            errors.imageUrl ? "modal__input_type_error" : ""
          }`}
          id="garment-imageUrl-input"
          name="imageUrl"
          placeholder="Image URL"
          required
          onChange={handleChange}
          value={values.imageUrl}
        />
      </label>
      <fieldset className="modal__radio-btns">
        <legend className="modal__legend">Select the weather type:</legend>
        <div className="modal__radio-group">
          <input
            type="radio"
            className="modal__radio"
            id="radio-hot"
            name="weather"
            value="hot"
            checked={values.weather === "hot"}
            onChange={handleChange}
          />
          <label
            htmlFor="radio-hot"
            className="modal__label modal__label_type_radio"
          >
            Hot
          </label>
        </div>
        <div className="modal__radio-group">
          <input
            type="radio"
            className="modal__radio"
            id="radio-warm"
            name="weather"
            value="warm"
            checked={values.weather === "warm"}
            onChange={handleChange}
          />
          <label
            htmlFor="radio-warm"
            className="modal__label modal__label_type_radio"
          >
            Warm
          </label>
        </div>
        <div className="modal__radio-group">
          <input
            type="radio"
            className="modal__radio"
            id="radio-cold"
            name="weather"
            value="cold"
            checked={values.weather === "cold"}
            onChange={handleChange}
          />
          <label
            htmlFor="radio-cold"
            className="modal__label modal__label_type_radio"
          >
            Cold
          </label>
        </div>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
