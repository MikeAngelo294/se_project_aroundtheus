import Card from "../components/Card.js";

import FormValidator from "../components/FormValidator.js";

const initialCards = [
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

const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

const validationConfig = {
  ///formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardSelector = "#card-template";
const cardListEl = document.querySelector("#cards__list-container");
const cardsWrap = document.querySelector(".cards__list");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardFormElement = addCardModal.querySelector(".modal__form");

const profileEditButton = document.querySelector("#profile-edit-button");
const profileModalCloseButton = profileEditModal.querySelector(".modal__close");
const addCardModalCloseButton = addCardModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const addNewCardButton = document.querySelector(".profile__add-button");

const previewModal = document.querySelector("#preview-modal");
const previewImageElement = document.querySelector(".modal__image");
const previewImageTitle = document.querySelector(".modal__image-title");
const modalContainer = document.querySelector(".modal__container");
const previewModalCloseButton = previewModal.querySelector(".modal__close");

///form data
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardTitleInput = document.querySelector(".modal__input_type_title");
const cardUrlInput = addCardFormElement.querySelector(".modal__input_type_url");

const editValidator = new FormValidator(validationConfig, profileEditForm);
editValidator.enableValidation();

const cardAddValidator = new FormValidator(
  validationConfig,
  addCardFormElement
);
cardAddValidator.enableValidation();

///close modal
function closePopUp(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscape);
  modal.removeEventListener("mousedown", handleModalClose);
}

///open modal
function openPopUp(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscape);
  modal.addEventListener("mousedown", handleModalClose);
}

//render cards including Handle, template,view

function createCard(item) {
  const card = new Card(item, "#card-template", handleImageClick);
  return card.getView();
}

function renderCard(cardData, cardListEl) {
  const card = createCard(cardData);
  cardListEl.prepend(card);
}

//closing popup with escape and overlay
function handleEscape(event) {
  if (event.key === "Escape") {
    const openModal = document.querySelector(".modal_opened");
    closePopUp(openModal);
  }
}

function handleModalClose(event) {
  if (
    event.target === event.currentTarget ||
    event.target.classList.contains("modal__close")
  ) {
    closePopUp(event.currentTarget);
  }
}

///establish handleImageClick
function handleImageClick(cardData) {
  previewImageElement.src = cardData.link;
  previewImageElement.alt = cardData.name;
  previewImageTitle.textContent = cardData.name;
  openPopUp(previewModal);
}

function handleProfileEditSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopUp(profileEditModal);
}

function handleAddCardFormSubmit(event) {
  event.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  closePopUp(addCardModal);
  event.target.reset();
  //cardAddValidator.resetFormValidation();
  cardAddValidator.toggleButtonState();
}

///Event listeners
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopUp(profileEditModal);
});

//add new card listener button
addNewCardButton.addEventListener("click", () => openPopUp(addCardModal));

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
