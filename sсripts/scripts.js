const popupElement = document.querySelector('.popup');
const popupFormContainer = popupElement.querySelector('.popup__form');
const popupCloseBtn = popupElement.querySelector('.popup__close');
let profileElement = document.querySelector('.profile');
const popupOpenBtn = profileElement.querySelector('.profile__edit-button');
let popupName = popupElement.querySelector('.popup__input_type_name');
let popupAbout = popupElement.querySelector('.popup__input_type_about');
let profileName = profileElement.querySelector('.profile__name');
let profileAbout = profileElement.querySelector('.profile__about');
const buttonsLike = document.querySelectorAll('.elements__like');
const buttonsLikeArray = Array.from(buttonsLike);

const openPopup = function() {
  popupName.value = profileName.textContent;
  popupAbout.value = profileAbout.textContent;
  popupElement.classList.add('popup_opened');
}

const closePopup = function() {
  popupElement.classList.remove('popup_opened');
}

let submitPopupFormContainer = function(evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileAbout.textContent = popupAbout.value;
    closePopup();
};

for(let i=0; i < buttonsLikeArray.length; i++) {
  const buttonLike = buttonsLikeArray[i];
  buttonLike.addEventListener('click', function(){
    buttonLike.classList.toggle('elements__like_active');
  });
};

popupOpenBtn.addEventListener('click', openPopup);
popupCloseBtn.addEventListener('click', closePopup);
popupFormContainer.addEventListener('submit',submitPopupFormContainer);