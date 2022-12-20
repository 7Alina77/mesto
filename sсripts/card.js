const cardsElement = document.querySelector('.elements');

class Card {
  constructor(name,link) {
    this._title = name;
    this._img = link;
  }
  
  _getTemplate() {
    const cardElement = document
    .querySelector('.card-template')
    .content
    .querySelector('.elements__item')
    .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.elements__image').src = this._img;
    this._element.querySelector('.elements__image').alt = this._title;
    this._element.querySelector('.elements__title').textContent = this._title;
    return this._element;
  }

  _toggleLIke() {
    this._element.querySelector('.elements__like').classList.toggle('elements__like_active');
  }

  _deleteCard() {
    this._element.closest('.elements__item').remove();
  }

  _setEventListeners() {
    this._element.querySelector('.elements__like').addEventListener('click', () => {
      this._toggleLIke();
    });

    this._element.querySelector('.elements__trash').addEventListener('click', () => {
      this._deleteCard();
    })
  }
}

export {cardsElement, Card};