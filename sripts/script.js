const popupElement = document.querySelector('.popup');
const popupCloseBtn = popupElement.querySelector('.popup__close');
let profileElement = document.querySelector('.profile');
const popupOpenBtn = profileElement.querySelector('.profile__edit-button');

const openPopup = function() {
  popupElement.classList.add('popup_opened');
}

const closePopup = function() {
  popupElement.classList.remove('popup_opened');
}

popupOpenBtn.addEventListener('click', openPopup);
popupCloseBtn.addEventListener('click', closePopup);

let popupInputs = popupElement.querySelectorAll('.popup__input');
let profileName = profileElement.querySelector('.profile__name');
let profileAbout = profileElement.querySelector('.profile__about');
popupInputs[0].value = profileName.textContent;
popupInputs[1].value = profileAbout.textContent;

const saveBtn = popupElement.querySelector('.popup__save');
saveBtn.addEventListener('click', function(evt) {
    evt.preventDefault();
    profileName.textContent = popupInputs[0].value;
    profileAbout.textContent = popupInputs[1].value;
    closePopup();
});