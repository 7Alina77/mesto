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

/**export const handleDeleteClick = (id) => {
  card.deleteCard(id)
};**/

export const createCard = (data) => {
  const card = new Card(data, cardTemplateSelector, handleCardClick/**, 
    handleDeleteClick: (id) => {
      handleDeleteCard(id) {
      .then(() => {
        card.deleteCard()
      })
  }**/);
  const cardElement = card.generateCard();
  return cardElement;
}

export const handleEditProfileData = (res) => {
  popupName.value = res.name;
  popupAbout.value = res.about;
};