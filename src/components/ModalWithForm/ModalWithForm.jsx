import "./ModalWithForm.css";
import Modal from "../Modal/Modal";

function ModalWithForm({
  name,
  onClose,
  isModalOpen,
  hasForm,
  children,
  title,
  buttonText,
  onSubmit
}) {
  return (
    <Modal name={name} onClose={onClose} isModalOpen={isModalOpen} hasForm={hasForm}>
      <h2 className="modal__title">{title}</h2>
      <form name={name} className="modal__form" noValidate onSubmit={onSubmit}>
        {children}
        <button type="submit" className="modal__submit-btn">
          {buttonText}
        </button>
      </form>
    </Modal>
  );
}

export default ModalWithForm;
