const hasInvalidInput = (inputList) => {
  return inputList.some((inputElem) => {
    return !inputElem.validity.valid;
  })
};

const toggleBtnState = (inputList, btnElem, rest) => {
  if(hasInvalidInput(inputList)) {
    btnElem.classList.add(rest.inactiveButtonClass);
  } else {
    btnElem.classList.remove(rest.inactiveButtonClass);
  }
}

const showInputError = (formElem, inputElem, errorMessage, rest) => {
  const errorElem = formElem.querySelector(`.${inputElem.id}-error`);
  inputElem.classList.add(rest.inputErrorClass);
  errorElem.textContent = errorMessage;
  errorElem.classList.add(rest.errorClass);
};

const hideInputError = (formElem, inputElem, rest) => {
  const errorElem = formElem.querySelector(`.${inputElem.id}-error`);
  inputElem.classList.remove(rest.inputErrorClass);
  errorElem.classList.remove(rest.errorClass);
  errorElem.textContent = '';
}

const isValid = (formElem, inputElem, rest) => {
  if(!inputElem.validity.valid) {
    showInputError(formElem, inputElem, inputElem.validationMessage, rest);
  } else {
    hideInputError(formElem, inputElem, rest);
  }
};

const setEventListeners = (formElem, rest) => {
  const inputList = Array.from(formElem.querySelectorAll(rest.inputSelector));
  const btnElem = formElem.querySelector(rest.submitButtonSelector);
  toggleBtnState(inputList, btnElem, rest);
  inputList.forEach((inputElem) => {
    inputElem.addEventListener('input', () => {
      isValid(formElem, inputElem, rest);
      toggleBtnState(inputList, btnElem, rest);
    });
  });
};

const enableValidation = (config) => {
  const {formSelector, ...rest} = config;
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElem) => {
    formElem.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElem, rest);
  });
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
});