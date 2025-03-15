import "./ModalWithForm.css";
import closeIcon from "../../assets/close-icon-gray.svg";

function ModalWithForm({
  title,
  name,
  buttonText,
  children,
  activeModal,
  onClose,
}) {
  return (
    <div
      className={`modal modal_type_${name} ${
        activeModal === "add-garment" && "modal_opened"
      }`}
    >
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          type="button"
          className="modal__close-btn"
          onClick={onClose}
        >
          <img src={closeIcon} alt="Close icon" />
        </button>
        <form action="" className="modal__form">
          {children}
          <button type="submit" className="modal__submit-btn">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
