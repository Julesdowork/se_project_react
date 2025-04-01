import { useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import "./AddItemModal.css";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({ isModalOpen, onClose, onAddItem, isLoading }) {
  const { values, handleChange, setValues } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(values);
  };

  useEffect(() => {
    setValues({
      name: "",
      imageUrl: "",
      weather: "",
    });
  }, [isModalOpen]);

  return (
    <ModalWithForm
      name="add-garment"
      onClose={onClose}
      isModalOpen={isModalOpen}
      hasForm={true}
      title="New garment"
      buttonText={isLoading ? "Adding..." : "Add garment"}
      onSubmit={handleSubmit}
    >
      <label htmlFor="garment-name-input" className="modal__label">
        Name
        <span className="modal__error"></span>
        <input
          type="text"
          className="modal__input"
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
      <label htmlFor="garment-imageUrl-input" className="modal__label">
        Image
        <span className="modal__error"></span>
        <input
          type="url"
          className="modal__input"
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
