import {popupWithImage, userInfo} from '../pages/index.js';
import {Card} from '../components/Card.js';
import {cardsElement} from '../utils/constants.js';
import {profileElement,
popupName,
popupAbout,
cardTemplateSelector} from '../utils/constants.js';
import { UserInfo } from '../components/UserInfo.js';

export const handleCardClick = (imageTitle, imageImg) => {
  popupWithImage.open(imageTitle, imageImg);
};

export const createCard = (data) => {
  const card = new Card(data, 
    cardTemplateSelector, 
    userInfo.getUserInfo().id,
    handleCardClick,
    {handleDeleteClick: (data) => {
      console.log(data);
    }});
  const cardElement = card.generateCard();
  return cardElement;
}

export const handleEditProfileData = (res) => {
  popupName.value = res.name;
  popupAbout.value = res.about;
};