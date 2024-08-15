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

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

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
const cardUrlInput = document.querySelector(".modal__input_type_url");

///close modal
function closePopUp(modal) {
  modal.classList.remove("modal_opened");
  document.addEventListener("keydown", clickEscape);
}

///open modal
function openPopUp(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", clickEscape);
  modal.addEventListener("mousedown", overlayEscape);
}

//render cards
function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

//closing popup with escape and overlay
function clickEscape(event) {
  if (event.key === "Escape") {
    const openModal = document.querySelector(".modal_opened");
    closePopUp(openModal);
  }
}

function overlayEscape(event) {
  if (
    event.target === event.currentTarget ||
    event.target.classList.contains("modal__close")
  ) {
    closePopUp(event.currentTarget);
  }
}

function getCardElement(cardData) {
  //clone the template element with all its content and store it in a cardElement variable
  const cardElement = cardTemplate.cloneNode(true);
  //access the card title and image and store them in variables
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__label");
  const likeButton = cardElement.querySelector(".card__like-button");
  ///FIND DELETE BUTTON
  const deleteButton = cardElement.querySelector(".card__delete-button");
  ///ADD EVENT LISTENR TO DELETE BUTTON & cardElement.remove();
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  ///add click listener to cardImage element & open with previewImage Modal & close
  cardImageEl.addEventListener("click", () => {
    previewImageElement.src = cardData.link;
    previewImageElement.alt = cardData.name;
    previewImageTitle.textContent = cardData.name;
    openPopUp(previewModal);
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  //set the path to the image to the link field of the object
  cardImageEl.src = cardData.link;
  //set the image alt text to the name field of the object
  cardImageEl.alt = cardData.name;
  //set the card title to the name field of the object, too
  cardTitleEl.textContent = cardData.name;
  //return the ready HTML element with the filled-in data

  return cardElement;
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
}

///Event listeners
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopUp(profileEditModal);
});
profileModalCloseButton.addEventListener("click", () =>
  closePopUp(profileEditModal)
);

previewModalCloseButton.addEventListener("click", () =>
  closePopUp(previewModal)
);

//add new card listener button
addNewCardButton.addEventListener("click", () => openPopUp(addCardModal));
addCardModalCloseButton.addEventListener("click", () =>
  closePopUp(addCardModal)
);

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
