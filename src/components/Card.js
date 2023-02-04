export class Card {
  constructor(data, templateSelector, handleCardClick/** , {handleDeleteClick}*/) {
    this._title = data.name;
    this._img = data.link;
    this._id = data._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    /**this._handleDeleteClick = handleDeleteClick;**/
    this._element = this._getTemplate();
    this._cardImg = this._element.querySelector('.elements__image');
    this._cardTitle = this._element.querySelector('.elements__title');
    this._cardLike = this._element.querySelector('.elements__like');
    this._cardTrash = this._element.querySelector('.elements__trash');
  }
  
  _getTemplate() {
    const cardElement = this._templateSelector
    .content
    .querySelector('.elements__item')
    .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._setEventListeners();
    this._cardImg.src = this._img;
    this._cardImg.alt = this._title;
    this._cardTitle.textContent = this._title;
    return this._element;
  }

  _toggleLike() {
    this._cardLike.classList.toggle('elements__like_active');
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._cardLike.addEventListener('click', () => {
      this._toggleLike();
    });

    this._cardTrash.addEventListener('click', () => {
      this._handleDeleteClick(this._id);
    });

    this._cardImg.addEventListener('click', () => {
      this._handleCardClick(this._title, this._img);
    });
  }
}