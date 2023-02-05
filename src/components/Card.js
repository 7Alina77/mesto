export class Card {
  constructor(data, templateSelector,userId ,handleCardClick, handleDeleteClick) {
    this._title = data.name;
    this._img = data.link;
    this._cardId = data._id;
    this._likes = data.likes;
    this._likesLength = data.likes.length;
    this._owner = data.owner;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._element = this._getTemplate();
    this._cardImg = this._element.querySelector('.elements__image');
    this._cardTitle = this._element.querySelector('.elements__title');
    this._cardLike = this._element.querySelector('.elements__like');
    this._cardLikeCount = this._element.querySelector('.elements__like-count');
    this._cardTrash = this._element.querySelector('.elements__trash');
  }
  
  _getTemplate() {
    const cardElement = this._templateSelector
    .content
    .querySelector('.elements__item')
    .cloneNode(true);
    return cardElement;
  }

  setListeners() {
    if(this._userId !== this._owner._id) {
      this._cardTrash.remove()
    };
  }

  generateCard() {
    this._setEventListeners();
    this._cardImg.src = this._img;
    this._cardImg.alt = this._title;
    this._cardTitle.textContent = this._title;
    this._cardLikeCount.textContent = this._likesLength;
    this.setListeners();
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