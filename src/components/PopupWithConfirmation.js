import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.popup__form');
  }

  open(card) {
    super.open();
    this._card = card;
  }
  
  newMethodDelete(newDelete) {
    this._newMethod = newDelete;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._newMethod();
    })
  }
}