import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImg = this._popup.querySelector('.popup__img');
    this._popupTitle = this._popup.querySelector('.popup__img-title');
  }

  open(imageTitle, imageImg) {
    super.open();
    this._popupImg.src = imageImg;
    this._popupImg.alt = imageTitle;
    this._popupTitle.textContent =imageTitle;
  }

  close() {
    super.close();
  }

  _handleEscClose(evt) {
    super._handleEscClose(evt);
  }

  setEventListeners() {
    super.setEventListeners();
  }
}