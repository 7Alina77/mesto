/**
const popupElements = document.querySelectorAll('.popup');
const popupElementsArray = Array.from(popupElements);
const popupFormContainer = popupElement.querySelector('.popup__form');
const popupCloseBtns = popupElement.querySelectorAll('.popup__close');
const popupCloseBtnsArray = Array.from(popupCloseBtns);
let profileElement = document.querySelector('.profile');
const popupOpenBtn = profileElement.querySelector('.profile__edit-button');
let popupName = popupElement.querySelector('.popup__input_type_name');
let popupAbout = popupElement.querySelector('.popup__input_type_about');
let profileName = profileElement.querySelector('.profile__name');
let profileAbout = profileElement.querySelector('.profile__about');
const buttonsLike = document.querySelectorAll('.elements__like');
const buttonsLikeArray = Array.from(buttonsLike);
const popupAddElement = document.querySelector('.popup__add-element');
const popupAddElementOpen = document.querySelector('.profile__add-button');


popupElementsArray.forEach(function(popup) {
  const popupElement = popupElementsArray[i];
  const popupCloseBtn = popup.querySelector('.popup__close');
  popupCloseBtn.addEventListener('click', closePopup());
});

popupElement.forEach(function(popup) {
  const popupCloseBtn = popup.querySelector('.popup__close');
  popupCloseBtn.addEventListener('click', closePopup(popupElement));
});

popupAddElementOpen.addEventListener('click', function() {
  openPopup(popupAddElement);
});


for(let i=0; i < buttonsLikeArray.length; i++) {
  const buttonLike = buttonsLikeArray[i];
  buttonLike.addEventListener('click', function(){
    buttonLike.classList.toggle('elements__like_active');
  });
};

popupOpenBtn.addEventListener('click', function() {
  popupName.value = profileName.textContent;
  popupAbout.value = profileAbout.textContent;
  openPopup(popupElement);
});

popupElements.forEach(function(item) {
  let submitPopupFormContainer = function(evt) {
    evt.preventDefault();
  if (item.querySelector('.popup__edit')) {
    profileName.textContent = popupName.value;
    profileAbout.textContent = popupAbout.value;
  } else if (item.querySelector('popup__add-element')) {
    popupPlace.value = initialCards.name;
    popupLink.value = initialCards.link;
  } else {
    closePopup(item);
  } closePopup(item);
};});


popupElements.forEach(function(item) {
  const popupFormContainer = item.querySelector('.popup__form');
  const popupSubmitBtn = item.querySelector('.popup__save');
  popupSubmitBtn.addEventListener('click', function() {
      popupFormContainer.addEventListener('submit', function() {
        submitPopupFormContainer()});
  });
});

popupFormContainer.addEventListener('submit',submitPopupFormContainer);**/