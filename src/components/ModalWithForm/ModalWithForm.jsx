import "./ModalWithForm.css";
import closeIcon from "../../assets/close.svg";

function ModalWithForm({ title, name, buttonText, children }) {
  return (
    <div className={`modal modal_type_${name}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button type="button" className="modal__close-btn">
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
