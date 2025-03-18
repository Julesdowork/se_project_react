import "./ItemModal.css";
import Modal from "../Modal/Modal";

function ItemModal({ name, onClose, isModalOpen, hasForm, card }) {
  return (
    <Modal
      name={name}
      onClose={onClose}
      isModalOpen={isModalOpen}
      hasForm={hasForm}
    >
      <img src={card.link} alt={card.name} className="modal__img" />
      <div className="modal__footer">
        <h2 className="modal__caption">{card.name}</h2>
        <p className="modal__weather">Weather: {card.weather}</p>
      </div>
    </Modal>
  );
}

export default ItemModal;
