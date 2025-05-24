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
  onSubmit,
  formValid,
  altBtnText,
  altBtnHandler,
}) {
  return (
    <Modal
      name={name}
      onClose={onClose}
      isModalOpen={isModalOpen}
      hasForm={hasForm}
      modalType={""}
    >
      <h2 className="modal__title">{title}</h2>
      <form name={name} className="modal__form" noValidate onSubmit={onSubmit}>
        {children}
        <div className="modal__submit-area">
          <button
            type="submit"
            className={`modal__submit-btn ${
              !formValid ? "modal__submit-btn_disabled" : ""
            }`}
            disabled={`${!formValid ? "disabled" : ""}`}
          >
            {buttonText}
          </button>
          <button
            type="button"
            className="modal__alt-btn"
            onClick={altBtnHandler}
          >
            {altBtnText}
          </button>
          {/* {name === "register" && (
            <button
              type="button"
              className="modal__alt-btn"
              onClick={() => setActiveModal("login")}
            >
              or Log in
            </button>
          )}
          {name === "login" && (
            <button
              type="button"
              className="modal__alt-btn"
              onClick={() => setActiveModal("register")}
            >
              or Register
            </button>
          )} */}
        </div>
      </form>
    </Modal>
  );
}

export default ModalWithForm;
