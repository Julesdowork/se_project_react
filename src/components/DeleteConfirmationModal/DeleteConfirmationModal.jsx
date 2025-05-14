import "./DeleteConfirmationModal.css";
import Modal from "../Modal/Modal";

function DeleteConfirmationModal({
  name,
  onClose,
  isModalOpen,
  hasForm,
  modalType,
  onConfirm,
}) {
  return (
    <Modal
      name={name}
      onClose={onClose}
      isModalOpen={isModalOpen}
      hasForm={hasForm}
      modalType={modalType}
    >
      <p className="modal__message">
        Are you sure you want to delete this item? This action is irreversible.
      </p>
      <button type="button" className="modal__confirm-btn" onClick={onConfirm}>
        Yes, delete item
      </button>
      <button type="button" className="modal__cancel-btn" onClick={onClose}>
        Cancel
      </button>
    </Modal>
  );
}

export default DeleteConfirmationModal;
