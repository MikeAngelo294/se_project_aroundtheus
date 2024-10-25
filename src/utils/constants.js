/*
export const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];
*/

export const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
export const cardSelector = "#card-template";
export const cardListEl = document.querySelector("#cards__list-container");
export const cardsWrap = document.querySelector(".cards__list");
export const profileEditModal = document.querySelector("#profile-edit-modal");
export const addCardModal = document.querySelector("#add-card-modal");
export const profileEditForm = profileEditModal.querySelector(".modal__form");
export const addCardFormElement = addCardModal.querySelector(".modal__form");

export const profileEditButton = document.querySelector("#profile-edit-button");
export const profileModalCloseButton =
  profileEditModal.querySelector(".modal__close");
export const addCardModalCloseButton =
  addCardModal.querySelector(".modal__close");
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const addNewCardButton = document.querySelector(".profile__add-button");

export const previewModal = document.querySelector("#preview-modal");
export const previewImageElement = document.querySelector(".modal__image");
export const previewImageTitle = document.querySelector(".modal__image-title");
export const modalContainer = document.querySelector(".modal__container");
export const previewModalCloseButton =
  previewModal.querySelector(".modal__close");

///form data
export const profileTitleInput = document.querySelector("#profile-title-input");
export const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
export const editModalForm = document.forms["edit-modal-form"];
export const cardTitleInput = document.querySelector(
  ".modal__input_type_title"
);
export const cardUrlInput = addCardFormElement.querySelector(
  ".modal__input_type_url"
);

export const validationConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
