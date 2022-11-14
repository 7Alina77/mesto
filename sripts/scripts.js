const popupElement = document.querySelector('.popup');
const popupFormContainer = popupElement.querySelector('.popup__container');
const popupCloseBtn = popupElement.querySelector('.popup__close');
let profileElement = document.querySelector('.profile');
const popupOpenBtn = profileElement.querySelector('.profile__edit-button');

const openPopup = function() {
  popupElement.classList.add('popup__opened');
}

const closePopup = function() {
  popupElement.classList.remove('popup__opened');
}

let popupName = popupElement.querySelector('.popup__input_name');
let popupAbout = popupElement.querySelector('.popup__input_about');
let profileName = profileElement.querySelector('.profile__name');
let profileAbout = profileElement.querySelector('.profile__about');
popupName.value = profileName.textContent;
popupAbout.value = profileAbout.textContent;

let submitPopupFormContainer = function(evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileAbout.textContent = popupAbout.value;
    closePopup();
};

popupOpenBtn.addEventListener('click', openPopup);
popupCloseBtn.addEventListener('click', closePopup);
popupFormContainer.addEventListener('submit',submitPopupFormContainer);