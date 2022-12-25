import {initialCards} from './cards.js';
import {Card} from "./card.js";
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

const cardPrepend = function(item) {
  const card = new Card(item.name, item.link);
  const cardElement = card.generateCard();
  cardsElement.prepend(cardElement);
};

initialCards.forEach((item) => {
  cardPrepend(item);
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
  const resetBtn = popupAddElement.querySelector('.popup__save');
  resetBtn.classList.add('popup__save_disabled');
  resetBtn.setAttribute('disabled', 'disabled');
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

const editFormValidation = new FormValidator(data, popupEditElement);
editFormValidation.enableValidation();

const addFormvalidation = new FormValidator(data, popupAddElement);
addFormvalidation.enableValidation();

popupEditForm.addEventListener('submit', handleSubmitEditForm);
popupAddForm.addEventListener('submit', handleSubmitAddForm);

export {openPopup, popupElements,popupImageElement,popupImageImg,popupImageTitle};