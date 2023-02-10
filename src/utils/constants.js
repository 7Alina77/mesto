export const profileElement = document.querySelector('.profile');
export const popupEditElement = document.querySelector('.popup_edit');
export const popupEditSaveBtn = popupEditElement.querySelector('.popup__save');
export const popupAddElement = document.querySelector('.popup_add-element');
export const popupAddSaveBtn = popupAddElement.querySelector('.popup__save');
export const popupEditAvatarElement = document.querySelector('.popup_avatar');
export const popupEditAvatarSaveBtn = popupEditAvatarElement.querySelector('.popup__save');
export const popupConfirmationElement = document.querySelector('.popup_confirmation');
export const popupConfirmationSaveBtn = popupConfirmationElement.querySelector('.popup__save');
export const popupAddOpenBtn = document.querySelector('.profile__add-button');
export const popupEditOpenBtn = profileElement.querySelector('.profile__edit-button');
export const popupEditAvatarBtn = profileElement.querySelector('.profile__avatar-background');
export const popupName = popupEditElement.querySelector('.popup__input_type_name');
export const popupAbout = popupEditElement.querySelector('.popup__input_type_about');
export const profileName = profileElement.querySelector('.profile__name');
export const profileAbout = profileElement.querySelector('.profile__about');
export const profileAvatar = profileElement.querySelector('.profile__avatar');
export const popupForm = popupAddElement.querySelector('.popup__form-add');
export const cardsElement = document.querySelector('.elements');
export const cardTemplateSelector = cardsElement.querySelector('.card-template');
export const token = '96da67be-193e-4896-a588-48f1d36951e6';
export const url = 'https://mesto.nomoreparties.co/v1/cohort-59';
export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};