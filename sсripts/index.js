import {initialCards} from './cards.js';
import {Card} from "./Card.js";
import {data, FormValidator} from './FormValidator.js';

const profileElement = document.querySelector('.profile');
const popupEditElement = document.querySelector('.popup_edit');
const popupAddElement = document.querySelector('.popup_add-element');
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
const cardsElement = document.querySelector('.elements');
const popupImageElement = document.querySelector('.popup_image');
const popupImageImg = popupImageElement.querySelector('.popup__img');
const popupImageTitle = popupImageElement.querySelector('.popup__img-title');

const handleCardClick = (imageTitle, imageImg) => {
  popupImageImg.src = imageImg;
  popupImageTitle.textContent = imageTitle;
  popupImageImg.alt = imageTitle;
  openPopup(popupImageElement);
};

const createCard = (item) => {
  const card = new Card(item.name, item.link,'.card-template', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

const appendCard = function(item) {
  const cardElement = createCard(item);
  cardsElement.append(cardElement);
}

const prependCard = function(item) {
  const cardElement = createCard(item);
  cardsElement.prepend(cardElement);
};

initialCards.forEach(appendCard);

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

popupEditOpenBtn.addEventListener('click', function() {
  editFormValidation.resetValidation();
  popupName.value = profileName.textContent;
  popupAbout.value = profileAbout.textContent;
  openPopup(popupEditElement);
});

popupAddOpenBtn.addEventListener('click', function() {
  addFormvalidation.resetValidation();
  popupAddForm.reset();
  addFormvalidation.toggleBtnState();
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
  prependCard(cardAdd);
  closePopup(popupAddElement);
};

popupElements.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
          closePopup(popup)
      }
      if (evt.target.classList.contains('popup__close')) {
        closePopup(popup)
      }
  })
});

const editFormValidation = new FormValidator(data, popupEditElement);
editFormValidation.enableValidation();

const addFormvalidation = new FormValidator(data, popupAddElement);
addFormvalidation.enableValidation();

popupEditForm.addEventListener('submit', handleSubmitEditForm);
popupAddForm.addEventListener('submit', handleSubmitAddForm);