const popupElement = document.querySelector('.popup');
const popupCloseBtn = popupElement.querySelector('.popup__close');
const popupOpenBtn = document.querySelector('.profile__edit-button');

const openPopup = function() {
  popupElement.classList.add('popup_opened');
}

const closePopup = function() {
  popupElement.classList.remove('popup_opened');
}

popupOpenBtn.addEventListener('click', openPopup);
popupCloseBtn.addEventListener('click', closePopup);