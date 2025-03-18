import "./ModalWithForm.css";
import Modal from "../Modal/Modal";

function ModalWithForm({
  title,
  name,
  buttonText,
  children,
  isModalOpen,
  hasForm,
  onClose,
}) {
  return (
    <Modal name={name} onClose={onClose} isModalOpen={isModalOpen} hasForm={hasForm}>
      <h2 className="modal__title">{title}</h2>
      <form name={name} className="modal__form" noValidate>
        {children}
        <button type="submit" className="modal__submit-btn modal__submit-btn_disabled">
          {buttonText}
        </button>
      </form>
    </Modal>
  );
}

export default ModalWithForm;
