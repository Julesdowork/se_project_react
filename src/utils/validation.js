const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formEl) => {
    setEventListeners(formEl, config);
  });
};

const setEventListeners = (formEl, config) => {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
  const buttonEl = formEl.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonEl, config);

  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", function () {
      checkInputValidity(inputEl, config);
      toggleButtonState(inputList, buttonEl, config);
    });
  });
};

const toggleButtonState = (inputList, buttonEl, config) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonEl, config);
  } else {
    buttonEl.disabled = false;
    buttonEl.classList.remove(config.inactiveButtonClass);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputEl) => {
    return !inputEl.validity.valid;
  });
};

const disableButton = (buttonEl, config) => {
  buttonEl.disabled = true;
  buttonEl.classList.add(config.inactiveButtonClass);
};

const checkInputValidity = (inputEl, config) => {
  if (!inputEl.validity.valid) {
    showInputError(inputEl, inputEl.validationMessage, config);
  } else {
    hideInputError(inputEl, config);
  }
};

const showInputError = (inputEl, errorMsg, config) => {
  inputEl.classList.add(config.inputErrorClass);
  const labelEl = Array.from(inputEl.labels)[0];
  const errorMsgEl = labelEl.querySelector(".modal__error");
  labelEl.classList.add(config.errorClass);
  errorMsgEl.textContent = ` (${errorMsg})`;
};

const hideInputError = (inputEl, config) => {
  inputEl.classList.remove(config.inputErrorClass);
  const labelEl = Array.from(inputEl.labels)[0];
  const errorMsgEl = labelEl.querySelector(".modal__error");
  errorMsgEl.textContent = "";
  labelEl.classList.remove(config.errorClass);
};

export { enableValidation };
