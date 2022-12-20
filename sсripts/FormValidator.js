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
  }

  _hasInvalidInput() {

  }

  _toggleBtnState() {
    
  }

  _showInputError() {
    
  }

  _hideInputError() {

  }

  _isValid() {

  }

  _setEventListeners() {

  }

  enableValidation() {
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formElem) => {
      formElem.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      _setEventListeners();
    })
  }
};

export {FormValidator}