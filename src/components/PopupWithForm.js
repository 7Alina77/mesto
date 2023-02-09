import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, {handleSubmitForm}) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._saveBtn = this._popup.querySelector('.popup__save');
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this.handleSubmitForm = handleSubmitForm;
  }

  isLoading(loading, text) {
    this._saveBtn.disabled = loading;
    this._saveBtn.textContent = text;
  }

  getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setInputValuesInForm(inputValues) {
    this._inputValues = inputValues;
    this._inputs = this.getInputValues();
    console.log(this._inputs)
    this._inputs.title = this._inputValues.title.textContent
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.handleSubmitForm(this.getInputValues());
    })
  }

  close() {
    super.close();
    this._form.reset();
  }
}