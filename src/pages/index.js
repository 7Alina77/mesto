import './index.css';

import {popupEditElement,
popupAddElement,
popupAddOpenBtn,
popupEditOpenBtn,
profileName,
profileAbout,
popupAddForm,
cardsElement} from "../utils/constants.js";

import {createCard,
handleEditProfileData} from '../utils/utils.js'

import {initialCards} from '../utils/cards.js';
import {data, FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm.js';

export const popupWithImage = new PopupWithImage('.popup_image');
popupWithImage.setEventListeners();

const cardList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    const cardElement = createCard(cardItem);
    cardList.addItem(cardElement);
  }
}, cardsElement);
cardList.renderItems();

const userInfo = new UserInfo(profileName, profileAbout);

const popupEditProfileForm = new PopupWithForm('.popup_edit', {
  handleSubmitForm: (userData) => {
    userInfo.setUserInfo(userData);
    popupEditProfileForm.close();
  }
})
popupEditProfileForm.setEventListeners();

const popupAddCardForm = new PopupWithForm('.popup_add-element', {
  handleSubmitForm: (formData) => {
    const cardElement = createCard(formData);
    cardList.addNewCard(cardElement);
    popupAddCardForm.close();
  }
})
popupAddCardForm.setEventListeners();

popupEditOpenBtn.addEventListener('click', function() {
  formEditValidation.resetValidation();
  popupEditProfileForm.open();
  const userData = userInfo.getUserInfo();
  handleEditProfileData(userData);
});

popupAddOpenBtn.addEventListener('click', function() {
  formAddvalidation.resetValidation();
  popupAddForm.reset();
  formAddvalidation.toggleBtnState();
  popupAddCardForm.open();
});

const formEditValidation = new FormValidator(data, popupEditElement);
formEditValidation.enableValidation();

const formAddvalidation = new FormValidator(data, popupAddElement);
formAddvalidation.enableValidation();