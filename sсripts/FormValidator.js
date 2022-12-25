const data = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

class FormValidator {
  constructor(data, formSelector) {
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._formSelector = formSelector;
    this._inputList = Array.from(this._formSelector.querySelectorAll(this._inputSelector));
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElem) => {
      return !inputElem.validity.valid;
    });
  }

  toggleBtnState() {
    const btnElem = this._formSelector.querySelector(this._submitButtonSelector);
    if(this._hasInvalidInput(this._inputList)) {
      btnElem.classList.add(this._inactiveButtonClass);
      btnElem.setAttribute('disabled', 'disabled');
    } else {
      btnElem.classList.remove(this._inactiveButtonClass);
      btnElem.removeAttribute('disabled', 'disabled');
    }
  }

  _showInputError(inputElem, errorMessage) {
    const errorElem = this._formSelector.querySelector(`.${inputElem.id}-error`);
    inputElem.classList.add(this._inputErrorClass);
    errorElem.textContent = errorMessage;
    errorElem.classList.add(this._errorClass);
  };

  _hideInputError(inputElem) {
    const errorElem = this._formSelector.querySelector(`.${inputElem.id}-error`);
    inputElem.classList.remove(this._inputErrorClass);
    errorElem.textContent = '';
    errorElem.classList.remove(this._errorClass);
  }

  _isValid(inputElem) {
    if(!inputElem.validity.valid) {
      this._showInputError(inputElem, inputElem.validationMessage)
    } else {
      this._hideInputError(inputElem)
    }
  }

  _resetInputError() {
    this._inputList.forEach((inputElem) => {
      if(inputElem.classList.contains(this._inputErrorClass)) {
        this._hideInputError(inputElem);
      }
    })
  }

  _setEventListeners() {
    this.toggleBtnState();
    this._inputList.forEach((inputElem, errorMessage) => {
      inputElem.addEventListener('input', () => {
        this._isValid(inputElem, errorMessage);
        this.toggleBtnState();
      })
    })
  }

  enableValidation() {
    this._inputList.forEach((inputElem) => {
      inputElem.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners();
    })
  }
};

export {data, FormValidator}