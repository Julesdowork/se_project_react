import "./ItemModal.css";
import closeIconWhite from "../../assets/close-icon-white.png";

function ItemModal({ name, activeModal, card, onCloseButtonClicked }) {
  return (
    <div
      className={`modal modal_type_${name} ${
        activeModal === "preview" && "modal_opened"
      }`}
    >
      <div className="modal__content modal__content_type_image">
        <button
          type="button"
          className="modal__close-btn"
          onClick={onCloseButtonClicked}
        >
          <img src={closeIconWhite} alt="Close icon" />
        </button>
        <img src={card.link} alt={card.name} className="modal__img" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
