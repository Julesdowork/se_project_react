import { useState } from "react";
import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({ isModalOpen, onClose, onAddItem }) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, imageUrl, weather });
    setName("");
    setImageUrl("");
    setWeather("");
  };

  return (
    <ModalWithForm
      name="add-garment"
      onClose={onClose}
      isModalOpen={isModalOpen}
      hasForm={true}
      title="New garment"
      buttonText="Add garment"
      onSubmit={handleSubmit}
    >
      <label htmlFor="garment-name-input" className="modal__label">
        Name
        <span className="modal__error"></span>
        <input
          type="text"
          className="modal__input"
          id="garment-name-input"
          placeholder="Name"
          required
          minLength={2}
          maxLength={40}
          onChange={handleNameChange}
          value={name}
        />
      </label>
      <label htmlFor="garment-imageUrl-input" className="modal__label">
        Image
        <span className="modal__error"></span>
        <input
          type="url"
          className="modal__input"
          id="garment-imageUrl-input"
          placeholder="Image URL"
          required
          onChange={handleImageUrlChange}
          value={imageUrl}
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
            checked={weather === "hot"}
            onChange={handleWeatherChange}
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
            checked={weather === "warm"}
            onChange={handleWeatherChange}
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
            checked={weather === "cold"}
            onChange={handleWeatherChange}
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
