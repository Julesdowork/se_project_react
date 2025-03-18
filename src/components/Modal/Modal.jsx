import { useEffect } from "react";
import closeIcon from "../../assets/close-icon-gray.svg";
import closeIconWhite from "../../assets/close-icon-white.png";

function Modal({ name, onClose, isModalOpen, hasForm, children }) {
  useEffect(() => {
    const handleEscPressed = (evt) => {
      if (evt.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscPressed);

    return () => {
      document.removeEventListener("keydown", handleEscPressed);
    };
  }, [onClose]);

  const handleOverlay = (evt) => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`modal modal_type_${name} ${isModalOpen && "modal_opened"}`}
      onClick={handleOverlay}
    >
      <div
        className={`modal__content ${!hasForm && "modal__content_type_image"}`}
      >
        {children}
        <button type="button" className="modal__close-btn" onClick={onClose}>
          <img src={hasForm ? closeIcon : closeIconWhite} alt="Close icon" />
        </button>
      </div>
    </div>
  );
}

export default Modal;
