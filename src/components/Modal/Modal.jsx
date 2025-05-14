import { useEffect } from "react";

import "./Modal.css";
import closeIcon from "../../assets/close-icon-gray.svg";
import closeIconWhite from "../../assets/close-icon-white.png";

function Modal({ name, onClose, isModalOpen, modalType, children }) {
  useEffect(() => {
    if (!isModalOpen) return; // stop the effect not to add the listener if there is no active modal

    const handleEscPressed = (evt) => {
      if (evt.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscPressed);

    return () => {
      document.removeEventListener("keydown", handleEscPressed);
    };
  }, [onClose, isModalOpen]);

  const handleOverlay = (evt) => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`modal modal_type_${name} ${
        isModalOpen ? "modal_opened" : ""
      }`}
      onClick={handleOverlay}
    >
      <div className={`modal__content ${modalType}`}>
        {children}
        <button type="button" className="modal__close-btn" onClick={onClose}>
          <img
            src={modalType === "preview" ? closeIconWhite : closeIcon}
            alt="Close icon"
          />
        </button>
      </div>
    </div>
  );
}

export default Modal;
