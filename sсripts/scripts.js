import initialCards from './cards.js';

const cardsElement = document.querySelector('.elements');
const profileElement = document.querySelector('.profile');
const popupEditElement = document.querySelector('.popup_edit');
const popupAddElement = document.querySelector('.popup_add-element');
const popupImageElement = document.querySelector('.popup_image');
const popupImageImg = popupImageElement.querySelector('.popup__img');
const popupImageTitle = popupImageElement.querySelector('.popup__img-title');
const popupAddOpenBtn = document.querySelector('.profile__add-button');
const popupEditOpenBtn = profileElement.querySelector('.profile__edit-button');
const popupName = popupEditElement.querySelector('.popup__input_type_name');
const popupAbout = popupEditElement.querySelector('.popup__input_type_about');
const profileName = profileElement.querySelector('.profile__name');
const profileAbout = profileElement.querySelector('.profile__about');
const popupPlace = popupAddElement.querySelector('.popup__input_type_place');
const popupLink = popupAddElement.querySelector('.popup__input_type_link');
const popupEditForm = popupEditElement.querySelector('.popup__form-edit');
const popupAddForm = popupAddElement.querySelector('.popup__form-add');
const popupElements = document.querySelectorAll('.popup');
const cardsTemplate = document.querySelector('#elements__item').content;


const createTemplate = function(card) {
  const cardElement = cardsTemplate.querySelector('.elements__item').cloneNode(true);
  const likeBtn = cardElement.querySelector('.elements__like');
  const trashBtn = cardElement.querySelector('.elements__trash');
  const cardImg = cardElement.querySelector('.elements__image');
  const cardTitle = cardElement.querySelector('.elements__title');
  cardImg.src = card.link;
  cardImg.alt = card.link;
  cardTitle.textContent = card.name;
  const popupImageOpen = function() {
    openPopup(popupImageElement);
    popupImageImg.src = card.link;
    popupImageTitle.textContent = card.name;
    popupImageImg.alt = card.name;
  };
  likeBtn.addEventListener('click', toggleLike);
  trashBtn.addEventListener('click', deleteCard);
  cardImg.addEventListener('click', popupImageOpen);
  return cardElement;
};

const toggleLike = function(evt) {
  evt.target.classList.toggle('elements__like_active');
};

const deleteCard = function(evt) {
  evt.target.closest('.elements__item').remove();
};

const cardAppend = function(item) {
  const card = createTemplate(item);
  cardsElement.append(card);
};

const cardPrepend = function(item) {
  const card = createTemplate(item);
  cardsElement.prepend(card);
};

initialCards.forEach(function(item) {
  cardAppend(item);
});

const openPopup = function(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
};

const closePopup = function(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
};

const closePopupByEsc = (evt) => {
  if(evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  };
};

popupElements.forEach(function(popup) {
  const popupCloseBtn = popup.querySelector('.popup__close');
  popupCloseBtn.addEventListener('click', function() {
    closePopup(popup)
  });
});

popupEditOpenBtn.addEventListener('click', function() {
  popupName.value = profileName.textContent;
  popupAbout.value = profileAbout.textContent;
  openPopup(popupEditElement);
});

popupAddOpenBtn.addEventListener('click', function() {
  popupAddForm.reset();
  openPopup(popupAddElement);
});

const handleSubmitEditForm = function(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileAbout.textContent = popupAbout.value;
  closePopup(popupEditElement);
};

const handleSubmitAddForm = function(evt) {
  evt.preventDefault();
  const cardAdd = {
    name: popupPlace.value,
    link: popupLink.value
  };
  cardPrepend(cardAdd);
  closePopup(popupAddElement);
};

popupElements.forEach(function(popupElement) {
  const closePopupByClickOnOverlay = function(evt) {
    if (evt.target === evt.currentTarget) {
      closePopup(popupElement);
    };
  };
  popupElement.addEventListener('click', closePopupByClickOnOverlay);
});

popupEditForm.addEventListener('submit', handleSubmitEditForm);
popupAddForm.addEventListener('submit', handleSubmitAddForm);