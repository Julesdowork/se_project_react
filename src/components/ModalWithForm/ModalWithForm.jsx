import "./ModalWithForm.css";
import closeIcon from "../../assets/close.svg";

function ModalWithForm() {
  return (
    <div className="modal">
      <div className="modal__content">
        <h2 className="modal__title">New garment</h2>
        <button type="button" className="modal__close-btn">
          <img src={closeIcon} alt="Close icon" />
        </button>
        <form action="" className="modal__form">
          <label htmlFor="name" className="modal__label">
            Name
            <input
              type="text"
              className="modal__input"
              id="name"
              placeholder="Name"
            />
          </label>
          <label htmlFor="imageUrl" className="modal__label">
            Image
            <input
              type="url"
              className="modal__input"
              id="imageUrl"
              placeholder="Image URL"
            />
          </label>
          <fieldset className="modal__radio-btns">
            <legend className="modal__legend">Select the weather type:</legend>
            <label
              htmlFor="hot"
              className="modal__label modal__label_type_radio"
            >
              <input type="radio" className="modal__radio" id="hot" name="weather" value="hot" />
              Hot
            </label>
            <label
              htmlFor="warm"
              className="modal__label modal__label_type_radio"
            >
              <input type="radio" className="modal__radio" id="warm" name="weather" value="warm" />
              Warm
            </label>
            <label
              htmlFor="cold"
              className="modal__label modal__label_type_radio"
            >
              <input type="radio" className="modal__radio" id="cold" name="weather" value="cold" />
              Cold
            </label>
          </fieldset>
          <button type="submit" className="modal__submit-btn">Add garment</button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
