import "./ItemModal.css";
import Modal from "../Modal/Modal";

function ItemModal({ name, onClose, isModalOpen, hasForm, card, onDeleteItem }) {
  return (
    <Modal
      name={name}
      onClose={onClose}
      isModalOpen={isModalOpen}
      hasForm={hasForm}
    >
      <img src={card.imageUrl} alt={card.name} className="modal__img" />
      <div className="modal__footer">
        <div className="modal__footer_left">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          <p>{card._id}</p>
        </div>
        <div className="modal__footer_right">
          <button type="button" className="modal__delete-btn" onClick={onDeleteItem}>
            Delete item
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ItemModal;
