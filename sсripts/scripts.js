const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardsElements = document.querySelector('.elements');
let profileElement = document.querySelector('.profile');
const popupEditElement = document.querySelector('.popup__edit');
const popupAddElement = document.querySelector('.popup__add-element');
const popupFormContainer = popupEditElement.querySelector('.popup__form');
const popupAddOpenBtn = document.querySelector('.profile__add-button');
const popupEditOpenBtn = profileElement.querySelector('.profile__edit-button');
let popupName = popupEditElement.querySelector('.popup__input_type_name');
let popupAbout = popupEditElement.querySelector('.popup__input_type_about');
let profileName = profileElement.querySelector('.profile__name');
let profileAbout = profileElement.querySelector('.profile__about');

initialCards.forEach(function(item) {
  const cardsTemplate = document.querySelector('#elements__item').content;
  const cardElement = cardsTemplate.querySelector('.elements__item').cloneNode(true);
  cardElement.querySelector('.elements__image').src = item.link;
  cardElement.querySelector('.elements__image').alt = item.link;
  cardElement.querySelector('.elements__title').textContent = item.name;
  cardsElements.append(cardElement);
});

const openPopup = function(popup) {
  popupName.value = profileName.textContent;
  popupAbout.value = profileAbout.textContent;
  popup.classList.add('popup_opened');
};

const closePopup = function(popup) {
  popup.classList.remove('popup_opened');
};

const popupElements = document.querySelectorAll('.popup');
popupElements.forEach(function(item) {
  const popupCloseBtn = item.querySelector('.popup__close');
  popupCloseBtn.addEventListener('click', function() {
    closePopup(item)});
});

let submitPopupFormContainer = function(evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileAbout.textContent = popupAbout.value;
    closePopup(popupEditElement);
};

popupEditOpenBtn.addEventListener('click', function() {
  popupName.value = profileName.textContent;
  popupAbout.value = profileAbout.textContent;
  openPopup(popupEditElement);
});

popupAddOpenBtn.addEventListener('click', function() {
  openPopup(popupAddElement);
});

popupFormContainer.addEventListener('submit',submitPopupFormContainer);