import './index.css';

import {profileElement,
popupEditElement,
popupAddElement,
popupAddOpenBtn,
popupEditOpenBtn,
profileName,
profileAbout,
popupAddForm,
cardsElement,
popupImageElement,
cardTemplateSelector} from "../utils/constants.js";

import {handleCardClick,
prependCard,
handleEditProfileData} from '../utils/utils.js'

import {initialCards} from '../utils/cards.js';
import {Card} from "../components/Card.js";
import {data, FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm.js';

export const popupWithImage = new PopupWithImage(popupImageElement);

const cardList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    const card = new Card(cardItem.name, cardItem.link, cardTemplateSelector, handleCardClick);
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
}, cardsElement);
cardList.renderItems();

const userInfo = new UserInfo(profileName, profileAbout);

const popupEditProfileForm = new PopupWithForm(popupEditElement, {
  handleSubmitForm: (userData) => {
    userInfo.setUserInfo(userData);
    popupEditProfileForm.close();
  }
})
popupEditProfileForm.setEventListeners();

const popupAddCardForm = new PopupWithForm(popupAddElement, {
  handleSubmitForm: (formData) => {
    prependCard(formData);
    popupAddCardForm.close();
  }
})
popupAddCardForm.setEventListeners();

popupEditOpenBtn.addEventListener('click', function() {
  editFormValidation.resetValidation();
  popupEditProfileForm.open();
  const userData = userInfo.getUserInfo();
  handleEditProfileData(userData);
});

popupAddOpenBtn.addEventListener('click', function() {
  addFormvalidation.resetValidation();
  popupAddForm.reset();
  addFormvalidation.toggleBtnState();
  popupAddCardForm.open();
});

const editFormValidation = new FormValidator(data, popupEditElement);
editFormValidation.enableValidation();

const addFormvalidation = new FormValidator(data, popupAddElement);
addFormvalidation.enableValidation();