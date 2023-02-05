import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, {handleSubmitConfirmationForm}) {
    super(popupSelector);
    this._handleSubmitConfirmationForm = handleSubmitConfirmationForm;
    this._popupForm = this._popup.querySelector('.popup__form');
  }

  open(id, card) {
    super.open();
    this._id = id;
    this._card = card;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', () => {
      this._handleSubmitConfirmationForm(evt, cardData);
    })
  }
}