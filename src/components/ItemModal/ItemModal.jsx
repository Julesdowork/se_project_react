import { useContext } from "react";

import "./ItemModal.css";
import Modal from "../Modal/Modal";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({
  name,
  onClose,
  isModalOpen,
  hasForm,
  modalType,
  card,
  onDeleteItem,
}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;

  return (
    <Modal
      name={name}
      onClose={onClose}
      isModalOpen={isModalOpen}
      hasForm={hasForm}
      modalType={modalType}
    >
      <img src={card.imageUrl} alt={card.name} className="modal__img" />
      <div className="modal__footer">
        <div className="modal__footer_left">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
        <div className="modal__footer_right">
          {isOwn && (
            <button
              type="button"
              className="modal__delete-btn"
              onClick={onDeleteItem}
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default ItemModal;
