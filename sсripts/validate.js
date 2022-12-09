const resetError = (formElem) => {
  const inputList = formElem.querySelectorAll('.popup__input');
  inputList.forEach((inputElem) => {
    hideInputError(formElem, inputElem);
  })
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElem) => {
    return !inputElem.validity.valid;
  })
};

const toggleBtnState = (inputList, btnElem) => {
  if(hasInvalidInput(inputList)) {
    btnElem.classList.add('popup__save_disabled');
  } else {
    btnElem.classList.remove('popup__save_disabled');
  }
}

const showInputError = (formElem, inputElem, errorMessage) => {
  const errorElem = formElem.querySelector(`.${inputElem.id}-error`);
  inputElem.classList.add('popup__input_type_error');
  errorElem.textContent = errorMessage;
  errorElem.classList.add('popup__input-error_visible');
};

const hideInputError = (formElem, inputElem) => {
  const errorElem = formElem.querySelector(`.${inputElem.id}-error`);
  inputElem.classList.remove('popup__input_type_error');
  errorElem.classList.remove('popup__input-error_visible');
  errorElem.textContent = '';
}

const isValid = (formElem, inputElem) => {
  if(!inputElem.validity.valid) {
    showInputError(formElem, inputElem, inputElem.validationMessage);
  } else {
    hideInputError(formElem, inputElem);
  }
};

const setEventListeners = (formElem) => {
  const inputList = Array.from(formElem.querySelectorAll('.popup__input'));
  const btnElem = formElem.querySelector('.popup__save');
  toggleBtnState(inputList, btnElem);
  inputList.forEach((inputElem) => {
    inputElem.addEventListener('input', () => {
      isValid(formElem, inputElem);
      toggleBtnState(inputList, btnElem);
    });
  });
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElem) => {
    formElem.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElem);
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