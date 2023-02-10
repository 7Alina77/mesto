import { validationConfig } from "../utils/constants";

class FormValidator {
  constructor(validationConfig, form) {
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._errorClass = validationConfig.errorClass;
    this._form = form;
    this._btnElem = this._form.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElem) => {
      return !inputElem.validity.valid;
    });
  }

  resetValidation() {
    this.toggleBtnState();
    this._inputList.forEach((inputElem) => {
      this._hideInputError(inputElem)
    });
  }

  toggleBtnState() {
    if(this._hasInvalidInput()) {
      this._btnElem.classList.add(this._inactiveButtonClass);
      this._btnElem.disabled = 'disabled';
    } else {
      this._btnElem.classList.remove(this._inactiveButtonClass);
      this._btnElem.removeAttribute('disabled');
    }
  }

  _showInputError(inputElem, errorMessage) {
    const errorElem = this._form.querySelector(`.${inputElem.id}-error`);
    inputElem.classList.add(this._inputErrorClass);
    errorElem.textContent = errorMessage;
    errorElem.classList.add(this._errorClass);
  };

  _hideInputError(inputElem) {
    const errorElem = this._form.querySelector(`.${inputElem.id}-error`);
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
    this._setEventListeners();
  }
  };

export {validationConfig, FormValidator}