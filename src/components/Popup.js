export class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
    this._popupCloseBtn = this._popup.querySelector('.popup__close');
  }

  open () {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown',(evt) => {
      this._handleEscClose(evt);
    })
  }

  close () {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown',(evt) => {
      this._handleEscClose(evt);
    })
  }

  _handleEscClose (evt) {
    if(evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners () {
    this._popupCloseBtn.addEventListener('click', () => {
      this.close();
    });

    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close()
    }
  });
  }
}