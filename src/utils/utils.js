import {popupWithImage} from '../pages/index.js';
import {Card} from '../components/Card.js';
import {cardsElement} from '../utils/constants.js';
import {profileElement,
popupName,
popupAbout,
cardTemplateSelector} from '../utils/constants.js';

export const handleCardClick = (imageTitle, imageImg) => {
  popupWithImage.open(imageTitle, imageImg);
};

export const createCard = (item) => {
  const card = new Card(item.name, item.link, cardTemplateSelector, handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

export const handleEditProfileData = (userData) => {
  popupName.value = userData.name;
  popupAbout.value = userData.info;
};