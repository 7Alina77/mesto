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
handleEditProfileData} from '../utils/utils.js'

import {initialCards} from '../utils/cards.js';
import {data, FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import {Api} from '../components/Api.js';

const api = new Api({url, token});


export const popupWithImage = new PopupWithImage('.popup_image');
popupWithImage.setEventListeners();

const cardList = new Section({
  renderer: (data) => {
    const cardElement = createCard(data);
    cardList.addItem(cardElement);
  }
}, cardsElement);


api.getInitialCards()
  .then((res) => {
    cardList.renderItems(res);
  })

const userInfo = new UserInfo(profileName, profileAbout, profileAvatar);

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

/**const popupAddCardForm = new PopupWithForm('.popup_add-element', {
  handleSubmitForm: (formData) => {
    const cardElement = createCard(formData);
    cardList.addNewCard(cardElement);
    popupAddCardForm.close();
  }
})
popupAddCardForm.setEventListeners();**/

popupEditOpenBtn.addEventListener('click', function() {
  formEditValidation.resetValidation();
  popupEditProfileForm.open();
  api.handleGetUserInfo()
    .then((res) => {
      handleEditProfileData(res)
    })
});

popupEditAvatarBtn.addEventListener('click', function () {
  //formEditAvatarValidation.resetValidation();
  //popupForm.reset();
  //formEditAvatarValidation.toggleBtnState();
  popupEditAvatar.open();
})

/**popupAddOpenBtn.addEventListener('click', function() {
  formAddvalidation.resetValidation();
  popupForm.reset();
  formAddvalidation.toggleBtnState();
  popupAddCardForm.open();
});**/

const formEditValidation = new FormValidator(data, popupEditElement);
formEditValidation.enableValidation();

const formEditAvatarValidation = new FormValidator(data, popupEditAvatarElement);

/**const formAddvalidation = new FormValidator(data, popupAddElement);
formAddvalidation.enableValidation();**/