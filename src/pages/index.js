import './index.css';

import {popupEditElement,
popupAddElement,
popupAddOpenBtn,
popupEditOpenBtn,
popupEditAvatarElement,
popupEditAvatarBtn,
profileName,
profileAbout,
profileAvatar,
popupForm,
cardsElement,
url,
token} from "../utils/constants.js";

import {createCard,
handleEditProfileData,
handleDeleteClick} from '../utils/utils.js'

import {initialCards} from '../utils/cards.js';
import {data, FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import {Api} from '../components/Api.js';

const api = new Api({url, token});

const cardList = new Section({
  renderer: (data) => {
    const cardElement = createCard(data);
    cardList.addItem(cardElement);
  }
}, cardsElement);

export const userInfo = new UserInfo(profileName, profileAbout, profileAvatar);

Promise.all([api.handleGetUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    cardList.renderItems(cards);
  })
  .catch((err) => {
    console.log(`Ошибка вывода карточек или данных юзера: ${err}`)
  });

export const popupWithImage = new PopupWithImage('.popup_image');
popupWithImage.setEventListeners();

const popupEditProfileForm = new PopupWithForm('.popup_edit', {
  handleSubmitForm: (userData) => {
    api.patchProfile(userData.title, userData.about)
      .then((data) => {
        userInfo.setUserInfo(data);
      })
      .then(() => {
        popupEditProfileForm.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
  }
});
popupEditProfileForm.setEventListeners();

const popupEditAvatar = new PopupWithForm('.popup_avatar', {
  handleSubmitForm: (userData) => {
    api.patchAvatar(userData.avatar)
      .then((data) => {
        userInfo.setUserInfo(data);
      })
      .then(() => {
        popupEditAvatar.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
  }
})
popupEditAvatar.setEventListeners();

const popupAddCardForm = new PopupWithForm('.popup_add-element', {
  handleSubmitForm: (formData) => {
    api.postNewCard(formData.name, formData.link)
      .then((res) => {
        const cardElement = createCard(res);
        cardList.addNewCard(cardElement);
        popupAddCardForm.close();
      })
      .catch((err) => {
        console.log(`Ошибка создания новой карточки: ${err}`)
      })
  }
})
popupAddCardForm.setEventListeners();

popupEditOpenBtn.addEventListener('click', function() {
  formEditValidation.resetValidation();
  popupEditProfileForm.open();
  api.handleGetUserInfo()
    .then((res) => {
      handleEditProfileData(res)
    })
});

popupEditAvatarBtn.addEventListener('click', function () {
  formEditAvatarValidation.resetValidation();
  popupForm.reset();
  formEditAvatarValidation.toggleBtnState();
  popupEditAvatar.open();
})

popupAddOpenBtn.addEventListener('click', function() {
  formAddvalidation.resetValidation();
  popupForm.reset();
  formAddvalidation.toggleBtnState();
  popupAddCardForm.open();
});

const formEditValidation = new FormValidator(data, popupEditElement);
formEditValidation.enableValidation();

const formEditAvatarValidation = new FormValidator(data, popupEditAvatarElement);
formEditAvatarValidation.enableValidation();

const formAddvalidation = new FormValidator(data, popupAddElement);
formAddvalidation.enableValidation();