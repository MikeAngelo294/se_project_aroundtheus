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
];*/

const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

/*
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

const addCardForm = document.forms["add-card-form"];

/* -------------------------------------------------------------------------- */
/*                       validation                      */
/* -------------------------------------------------------------------------- */

/*const editValidator = new FormValidator(validationConfig, editModalForm);
editValidator.enableValidation();

const cardAddValidator = new FormValidator(validationConfig, addCardForm);
cardAddValidator.enableValidation();*/

const formValidator = {};

const enableValidation = (validationConfig) => {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );

  formList.forEach((formModal) => {
    const validator = new FormValidator(validationConfig, formModal);

    const formName = formModal.getAttribute("name");

    formValidator[formName] = validator;
    validator.enableValidation();
  });
};
enableValidation(validationConfig);

const cardAddValidator = formValidator["add-card-form"];
const editValidator = formValidator["add-card-form"];

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

/* -------------------------------------------------------------------------- */
/*                        functions                      */
/* -------------------------------------------------------------------------- */

function renderCard(item, method = "addItem") {
  const cardElement = createCard(item);
  section[method](cardElement);
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getView();
}

///establish handleImageClick
function handleImageClick(data) {
  popupImage.open({ name: data.name, link: data.link });
}

//// use userInfo for handlesubmit
function handleProfileEditSubmit(inputValue) {
  /*const { name, description } = inputValue;
  userInfo.setUserInfo({ name, description });
  profileModal.close();*/
  userInfo.setUserInfo({
    name: inputValue.title,
    description: inputValue.description,
  });
}

function handleAddCardFormSubmit(inputValue) {
  /*const { name, link } = inputValue;
  addCard(createCard({ name, link }));
  addModal.close();
  addCardForm.reset();*/
  const cardData = {
    name: inputValue.title,
    link: inputValue.url,
  };

  addModal.close();
  addCardForm.reset();
  renderCard(cardData);
}

/* -------------------------------------------------------------------------- */
/*                             Event Listeners                      */
/* -------------------------------------------------------------------------- */
/*profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);*/

profileEditButton.addEventListener("click", () => {
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
