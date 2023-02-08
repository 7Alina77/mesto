import {popupWithImage, userInfo, api, popupWithConfirmation} from '../pages/index.js';
import {Card} from '../components/Card.js';
import {profileElement,
popupName,
popupAbout,
cardTemplateSelector} from '../utils/constants.js';
import { UserInfo } from '../components/UserInfo.js';


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
      popupWithConfirmation.newMethodDelete(() => {
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
            popupWithConfirmation.isLoading(false, "Сохранить")
          })
      });
    }},
    {handleLikeClick: (res) => {
      const method = newCard.isCardLiked() ? api.deleteLike(res) :  api.addLike(res)
        method.then((res) => {
          newCard.toggleLike()
          newCard.refreshLikeCount(res.likes.length)
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