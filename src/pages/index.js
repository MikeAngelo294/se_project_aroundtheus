import Api from "../components/Api.js";

import Card from "../components/Card.js";

import "./index.css";

import FormValidator from "../components/FormValidator.js";

import PopupWithForm from "../components/PopupWithForm.js";

import PopupWithImage from "../components/PopupWithImage.js";

import Section from "../components/Section.js";

import UserInfo from "../components/UserInfo.js";

import { /*initialCards,*/ validationConfig } from "../utils/constants.js";

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

/* -------------------------------------------------------------------------- */
/*                       validation                      */
/* -------------------------------------------------------------------------- */

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

api
  .getInitialCards()
  .then((cards) => {
    section.renderItems(cards);
  })
  .catch((err) => {
    console.error(err); // log the error to the console
  });

/*                        PopupWithForm                       */
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

/*                        PopupWithImage                      */
const popupImage = new PopupWithImage("#preview-modal");

/*                        Section                       */
const section = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  ".cards__list"
);

/*                        UserInfo                       */
const userInfo = new UserInfo({
  nameElement: ".profile__title",
  jobElement: ".profile__description",
});

/*                        component EventListeners                      */
profileModal.setEventListeners();

popupImage.setEventListeners();
//section.renderItems();

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
