import Api from "../components/Api.js";

import Card from "../components/Card.js";

import "./index.css";

import FormValidator from "../components/FormValidator.js";

import PopupWithForm from "../components/PopupWithForm.js";

import PopupWithImage from "../components/PopupWithImage.js";

import Section from "../components/Section.js";

import UserInfo from "../components/UserInfo.js";

import { validationConfig } from "../utils/constants.js";

const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

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

const profileAvatarButton = document.querySelector(".profile__avatar-button");

const avatarEditForm = document.querySelector(".profile-avatar-modal");

/* -------------------------------------------------------------------------- */
/*                       validation                      */
/* -------------------------------------------------------------------------- */
//refactor validation, simplify
/*
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
*/

const cardAddValidator = new FormValidator(config, addCardFormElement);
cardAddValidator.enableValidation;

const editValidator = new FormValidator(config, profileEditForm);
editValidator.enableValidation;

const avatarValidator = new FormValidator(config, avatarEditForm);
avatarValidator.enableValidation;

/* -------------------------------------------------------------------------- */
/*                        component                       */
/* -------------------------------------------------------------------------- */

/*                        API                       */

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "a7d09fcd-0691-40bd-af3f-b1a6b438dcbf",
    "Content-Type": "application/json",
  },
});

let section;

api
  .getAllInfo()
  .then(([initialCards, userData]) => {
    userInfo.updateAvatar(userData.avatarUser);
    userInfo.setUserInfo({
      name: userData.name,
      description: userData.about,
    });
    section = new Section(
      {
        items: initialCards,
        renderer: renderCard,
      },
      ".cards__list"
    );
    section.renderItems();
  })
  .catch((err) => {
    console.error(err);
  });
// log the error to the console

/*                        PopupWithForm with validators                 */
const profileModal = new PopupWithForm(
  {
    popupSelector: "#profile-edit-modal",
    handleFormSubmit: handleProfileEditSubmit,
  },
  editValidator
); ///

const profileAvatar = new PopupWithForm(
  {
    popupSelector: "#profile-avatar-modal",
    handleFormSubmit: handleAvatarSubmit,
  },
  avatarValidator
);

const addModal = new PopupWithForm(
  {
    popupSelector: "#add-card-modal",
    handleFormSubmit: handleAddCardFormSubmit,
  },
  cardAddValidator
); //

/*                        PopupWithImage                      */
const popupImage = new PopupWithImage("#preview-modal"); //

/*                        Section                       */

/*
const section = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  ".cards__list"
);

//initial cards from live overview
api
  .getInitialCards()
  .then((cards) => {
    section.renderItems(cards);
  })
  .catch((err) => {
    console.error(err); 
  }); */

/*                        UserInfo                       */
const userInfo = new UserInfo({
  nameElement: ".profile__title",
  jobElement: ".profile__description",
  avatarElement: ".profile__image",
});

////refactor under handle profile edit and apis
/*
api.getUserInfo().then((userData) => {
  userInfo.setUserInfo({
    name: userData.name,
    description: userData.about,
  });
}); */

/*                        component EventListeners                      */
profileModal.setEventListeners();

popupImage.setEventListeners();
//section.renderItems();
addModal.setEventListeners();

profileAvatar.setEventListeners();

/* -------------------------------------------------------------------------- */
/*                        functions                      */
/* -------------------------------------------------------------------------- */

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getView();
}

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  section.addItem(cardElement);
}

///establish handleImageClick///
function handleImageClick(data) {
  popupImage.open({ name: data.name, link: data.link });
}

//// use userInfo for handlesubmit
function handleProfileEditSubmit(inputValue) {
  userInfo.setUserInfo({
    name: inputValue.title,
    description: inputValue.description,
  });
  profileModal.close();
}

function handleAddCardFormSubmit(inputValue) {
  const cardData = {
    name: inputValue.title,
    link: inputValue.url,
  };

  renderCard(cardData);
  //cardAddValidator.disableSubmitButton();
  addModal.close();
  addCardForm.reset();
}

/* -------------------------------------------------------------------------- */
/*                             Event Listeners                      */
/* -------------------------------------------------------------------------- */
//
profileEditButton.addEventListener("click", () => {
  const { name, description } = userInfo.getUserInfo();
  profileTitleInput.value = name;
  profileDescriptionInput.value = description;
  profileModal.open();
});

//add new card listener button//
addNewCardButton.addEventListener("click", () => {
  addModal.open();
});

profileAvatarButton.addEventListener("click", () => {
  profileAvatar.open();
});
