import './index.css';

import {popupName,
popupAbout,
popupEditElement,
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
cardTemplateSelector,
url,
token} from "../utils/constants.js";

import {Card} from '../components/Card.js';
import {data, FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import {Api} from '../components/Api.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation';

export const api = new Api({url, token});

export const userInfo = new UserInfo(profileName, profileAbout, profileAvatar);

export const handleCardClick = (imageTitle, imageImg) => {
  popupWithImage.open(imageTitle, imageImg);
};

export const createCard = (data) => {
  const newCard = new Card(
    data, 
    cardTemplateSelector, 
    handleCardClick,
    {handleDeleteClick: (card) => {
      popupWithConfirmation.open(card);
      popupWithConfirmation.setCallback(() => {
        popupWithConfirmation.isLoading(true, "Сохранение...");
        api.handleDeleteCard(card._id)
          .then(() => {
            newCard.deleteCard()
            popupWithConfirmation.close()
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          })
          .finally(() => {
            popupWithConfirmation.isLoading(false, "Сохранено")
          })
      });
    }},
    {handleLikeClick: (res) => {
      const method = newCard.isCardLiked() ? api.deleteLike(res) :  api.addLike(res)
        method
          .then((res) => {
            newCard.toggleLike()
            newCard.refreshLikeCount(res.likes)
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          })
    }},
    userInfo.getUserInfo().id,
    )
  const cardElement = newCard.generateCard();
  return cardElement;
}

export const handleEditProfileData = (res) => {
  popupName.value = res.name;
  popupAbout.value = res.about;
};

const cardsSection = new Section({
  renderer: (data) => {
    const cardElement = createCard(data);
    cardsSection.appenItem(cardElement);
  }
}, cardsElement);

Promise.all([api.handleGetUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    cardsSection.renderItems(cards);
  })
  .catch((err) => {
    console.log(`Ошибка вывода карточек или данных юзера: ${err}`)
  });

export const popupWithImage = new PopupWithImage('.popup_image');
popupWithImage.setEventListeners();

const popupEditProfileForm = new PopupWithForm('.popup_edit', {
  handleSubmitForm: (userData) => {
    popupEditProfileForm.isLoading(true, "Сохранение...");
    api.patchProfile(userData.title, userData.about)
      .then((data) => {
        userInfo.setUserInfo(data);
        popupEditProfileForm.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
      .finally(() => {
        popupEditProfileForm.isLoading(false, "Сохранено")
      })
  }
});
popupEditProfileForm.setEventListeners();

export const popupWithConfirmation = new PopupWithConfirmation('.popup_confirmation');
popupWithConfirmation.setEventListeners();

const popupEditAvatar = new PopupWithForm('.popup_avatar', {
  handleSubmitForm: (userData) => {
    popupEditAvatar.isLoading(true, "Сохранение...");
    api.patchAvatar(userData.avatar)
      .then((data) => {
        userInfo.setUserInfo(data);
      })
      .then(() => {
        popupEditAvatar.close();
      })
      .catch((err) => {
        console.log(`Ошибка обновления аватара: ${err}`)
      })
      .finally(() => {
        popupEditAvatar.isLoading(false, "Сохранено")
      })
  }
})
popupEditAvatar.setEventListeners();

const popupAddCardForm = new PopupWithForm('.popup_add-element', {
  handleSubmitForm: (formData) => {
    popupAddCardForm.isLoading(true, "Сохранение...");
    api.postNewCard(formData.name, formData.link)
      .then((res) => {
        const cardElement = createCard(res);
        cardsSection.prependItem(cardElement);
        popupAddCardForm.close();
      })
      .catch((err) => {
        console.log(`Ошибка создания новой карточки: ${err}`)
      })
      .finally(() => {
        popupAddCardForm.isLoading(false, "Сохранено")
      })
  }
})
popupAddCardForm.setEventListeners();

popupEditOpenBtn.addEventListener('click', function() {
  formEditValidation.resetValidation();
  popupEditProfileForm.open();
  //const userProfileInfo = userInfo.getUserInfo();
  //popupEditProfileForm.setInputValuesInForm(userProfileInfo)
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
  formAddValidation.resetValidation();
  popupForm.reset();
  formAddValidation.toggleBtnState();
  popupAddCardForm.open();
});

const formEditValidation = new FormValidator(data, popupEditElement);
formEditValidation.enableValidation();

const formEditAvatarValidation = new FormValidator(data, popupEditAvatarElement);
formEditAvatarValidation.enableValidation();

const formAddValidation = new FormValidator(data, popupAddElement);
formAddValidation.enableValidation();