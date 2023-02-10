export class Card {
  constructor(data, templateSelector ,handleCardClick, {handleDeleteClick}, {handleLikeClick}, userId) {
    this._data = data,
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
    this._handleLikeClick = handleLikeClick;
    this._element = this._getTemplate();
    this._cardImg = this._element.querySelector('.elements__image');
    this._cardTitle = this._element.querySelector('.elements__title');
    this._cardLike = this._element.querySelector('.elements__like');
    this._cardLikeCount = this._element.querySelector('.elements__like-count');
    this._cardTrash = this._element.querySelector('.elements__trash');
  }

  checkButtonsInitialState() {
    if(this._userId !== this._owner._id) {
      this._cardTrash.remove();
      this._cardTrash = null;
    };

    if(this.isCardLiked()) {
      this.addLike();
    } 
  }

  isCardLiked () {
    return this._likes.some(user => user._id === this._userId)
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
    this._cardLikeCount.textContent = this._likesLength;
    this.checkButtonsInitialState();
    return this._element;
  }

  addLike() {
    this._cardLike.classList.add('elements__like_active');
    this._cardLikeCount.textContent = this._likesLength;
  }

  toggleLike() {
    this._cardLike.classList.toggle('elements__like_active');
  }

  refreshLikeCount (likes) {
    this._newLikesLength = likes.length;
    this._cardLikeCount.textContent = this._newLikesLength;
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._cardLike.addEventListener('click', () => {
      this._handleLikeClick(this._cardId);
    });

    this._cardTrash.addEventListener('click', () => {
      this._handleDeleteClick(this._data);
    });

    this._cardImg.addEventListener('click', () => {
      this._handleCardClick(this._title, this._img);
    });
  }
}