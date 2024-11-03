import Api from "../components/Api.js";

import Card from "../components/Card.js";

import "./index.css";

import PopupConfirmDelete from "../components/PopupConfirmDelete.js";

import FormValidator from "../components/FormValidator.js";

import PopupWithForm from "../components/PopupWithForm.js";

import PopupWithImage from "../components/PopupWithImage.js";

import Section from "../components/Section.js";

import UserInfo from "../components/UserInfo.js";

import { validationConfig } from "../utils/constants.js";

/*
const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
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

const profileAvatarButton = document.querySelector(".profile__avatar-button");

const avatarEditForm = document.querySelector(".modal__form");

/* -------------------------------------------------------------------------- */
/*                       validation                      */
/* -------------------------------------------------------------------------- */
//refactor validation, simplify

const cardAddValidator = new FormValidator(
  validationConfig,
  addCardFormElement
);
cardAddValidator.enableValidation();

const editValidator = new FormValidator(validationConfig, profileEditForm);
editValidator.enableValidation();

const avatarValidator = new FormValidator(validationConfig, avatarEditForm);
avatarValidator.enableValidation();

/* -------------------------------------------------------------------------- */
/*                        component                       */
/* -------------------------------------------------------------------------- */

/*                        API                       */

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "d5a3e5a4-85ea-4fc2-8d19-e21eb743542a",
    "Content-Type": "application/json",
  },
});

let section;

api
  .getAllInfo()
  .then(([initialCards, userData]) => {
    userInfo.updateAvatar(userData.avatar);
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
);

const profileAvatar = new PopupWithForm(
  {
    popupSelector: "#profile-avatar-modal",
    handleFormSubmit: handleAvatarSubmit,
  },
  avatarValidator
);

const confirmDeletePopup = new PopupConfirmDelete({
  popupSelector: "#delete-card-modal",
  handleFormSubmit: () => {},
});

const addModal = new PopupWithForm(
  {
    popupSelector: "#add-card-modal",
    handleFormSubmit: handleAddCardFormSubmit,
  },
  cardAddValidator
); //

/*                        PopupWithImage                      */
const popupImage = new PopupWithImage("#preview-modal"); //

/*                        UserInfo                       */
const userInfo = new UserInfo({
  nameElement: ".profile__title",
  jobElement: ".profile__description",
  avatarElement: ".profile__image",
});

/*                        component EventListeners                      */
profileModal.setEventListeners();

popupImage.setEventListeners();

addModal.setEventListeners();

confirmDeletePopup.setEventListeners();

profileAvatar.setEventListeners();

/* -------------------------------------------------------------------------- */
/*                        functions                      */
/* -------------------------------------------------------------------------- */

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleLikeIcon,
    handleDeleteCard
  );
  return card.getView();
}

function renderCard(item, method = "addItem") {
  const cardElement = createCard(item);
  section[method](cardElement);
}

///establish handleImageClick///
function handleImageClick(data) {
  popupImage.open({ name: data.name, link: data.link });
}

function handleProfileEditSubmit(userData) {
  profileModal.renderLoad(true);
  api
    .updateUserInfo(userData)
    .then((res) => {
      userInfo.setUserInfo({
        name: res.name,
        description: res.about,
      });
      profileModal.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      profileModal.renderLoad(false);
    });
}

function handleAddCardFormSubmit(data) {
  addModal.renderLoad(true);
  api
    .addCard({
      name: data.name,
      link: data.link,
      _id: data.id,
      isLiked: data.isLiked,
    })
    .then((cardData) => {
      renderCard(cardData);
      addModal.close();
      addCardForm.reset();
      cardAddValidator.disableSubmitButton();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      addModal.renderLoad(false);
    });
}

function handleLikeIcon(card) {
  if (card.getIsLiked()) {
    api
      .unlikeCard(card.getCardId())
      .then(() => {
        card.setIsliked(false);
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    api
      .likeCard(card.getCardId())
      .then(() => {
        card.setIsliked(true);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

function handleDeleteCard(card) {
  confirmDeletePopup.open();
  confirmDeletePopup.confirmDelete(() => {
    api
      .deleteCard(card.getCardId())
      .then(() => {
        card.handleDelete();
        confirmDeletePopup.close();
      })
      .catch((err) => {
        console.error(err);
      });
  });
}

function handleAvatarSubmit(link) {
  profileAvatar.renderLoad(true);
  api
    .updateAvatar(link)
    .then((res) => {
      userInfo.updateAvatar(res.avatar);
      profileAvatar.close();
      avatarEditForm.reset();
      avatarValidator.disableSubmitButton();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      profileAvatar.renderLoad(false);
    });
}

/* -------------------------------------------------------------------------- */
/*                             Event Listeners                      */
/* -------------------------------------------------------------------------- */
//
profileEditButton.addEventListener("click", () => {
  const data = userInfo.getUserInfo();
  profileTitleInput.value = data.name;
  profileDescriptionInput.value = data.description;
  profileModal.open();
});

//add new card listener button//
addNewCardButton.addEventListener("click", () => {
  addModal.open();
});

profileAvatarButton.addEventListener("click", () => {
  profileAvatar.open();
});
