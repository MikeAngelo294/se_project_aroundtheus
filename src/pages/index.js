import Card from "../components/Card.js";

import "./index.css";

import FormValidator from "../components/FormValidator.js";

import PopupWithForm from "../components/PopupWithForm.js";

import PopupWithImage from "../components/PopupWithImage.js";

import Section from "../components/Section.js";

import UserInfo from "../components/UserInfo.js";

import { initialCards, validationConfig } from "../utils/constants.js";

/*const initialCards = [
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

/*const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

const validationConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};*/

import {
  cardTemplate,
  cardSelector,
  cardListEl,
  cardsWrap,
  profileEditModal,
  addCardModal,
  profileEditForm,
  addCardFormElement,
  profileEditButton,
  profileModalCloseButton,
  addCardModalCloseButton,
  profileTitle,
  profileDescription,
  addNewCardButton,
  previewModal,
  previewImageElement,
  previewImageTitle,
  modalContainer,
  previewModalCloseButton,
  profileTitleInput,
  profileDescriptionInput,
  editModalForm,
  cardTitleInput,
  cardUrlInput,
} from "../utils/constants.js";

/* -------------------------------------------------------------------------- */
/*                       validation                      */
/* -------------------------------------------------------------------------- */

const editValidator = new FormValidator(validationConfig, profileEditForm);
editValidator.enableValidation();

const cardAddValidator = new FormValidator(
  validationConfig,
  addCardFormElement
);
cardAddValidator.enableValidation();

/* -------------------------------------------------------------------------- */
/*                        component classes                      */
/* -------------------------------------------------------------------------- */

const profileModal = new PopupWithForm(
  {
    popupSelector: "#profile-edit-modal",
    handleFormSubmit: handleProfileEditSubmit,
  },
  editValidator
);

const addModal = new PopupWithForm(
  {
    popupSelector: "#add-card-modal",
    handleFormSubmit: handleAddCardFormSubmit,
  },
  cardAddValidator
);

const popupImage = new PopupWithImage("#preview-modal");

const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = createCard(item);
      section.addItem(card);
    },
  },
  ".cards__list"
);

const userInfo = new UserInfo({
  nameElement: ".profile__title",
  jobElement: ".profile__description",
});

profileModal.setEventListeners();

popupImage.setEventListeners();
section.renderItems();
///close modal
/*
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
  */

/* -------------------------------------------------------------------------- */
/*                        functions                      */
/* -------------------------------------------------------------------------- */

//create and add card

function createCard(item) {
  const card = new Card(item, "#card-template", handleImageClick);
  return card.getView();
}

function addCard(card) {
  section.addItem(card, true);
}

/*function renderCard(cardData, cardListEl) {
  const card = createCard(cardData);
  cardListEl.prepend(card);
}*/

//closing popup with escape and overlay
/*
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
  */

///establish handleImageClick
function handleImageClick(data) {
  /*previewImageElement.src = cardData.link;
  previewImageElement.alt = cardData.name;
  previewImageTitle.textContent = cardData.name;
  openPopUp(previewModal);*/
  popupImage.open({ name: data.name, link: data.link });
}

//// use userInfo for handlesubmit
function handleProfileEditSubmit(inputValue) {
  /*
  event.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopUp(profileEditModal);
  */
  const { name, description } = inputValue;
  userInfo.setUserInfo({ name, description });
  profileModal.close();
}

function handleAddCardFormSubmit(inputValue) {
  /*event.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  closePopUp(addCardModal);
  event.target.reset();
  //cardAddValidator.resetFormValidation();
  cardAddValidator.toggleButtonState();*/
  const { name, link } = inputValue;
  addCard(createCard({ name, link }));
  addModal.close();
  addModal.reset();
}

/* -------------------------------------------------------------------------- */
/*                             Event Listeners                      */
/* -------------------------------------------------------------------------- */
/*profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);*/

profileEditButton.addEventListener("click", () => {
  /*profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopUp(profileEditModal);*/
  const { name, description } = userInfo.getUserInfo();
  profileTitleInput.value = name;
  profileDescriptionInput.value = description;
  profileModal.open();
});

//add new card listener button
addNewCardButton.addEventListener("click", () => {
  addModal.open();
});

addModal.setEventListeners();

//initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
