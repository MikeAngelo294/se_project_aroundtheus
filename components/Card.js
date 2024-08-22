export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    //.'.card__like-button';
    this._likeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });
    //".card__delete-button"
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteCard();
    });
    //".card__image"
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleLikeIcon() {
    /*this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");*/
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    //this._cardElement = document
    // .querySelector(this._cardSelector)
    //.content.querySelector(".card")
    //.cloneNode(true);
    this._cardElement = this._getTemplate();
    //likebutton
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    //card delete button
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    //get card viewer with image and title
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardElement.querySelector(".card__image").alt = this._name;
    this._cardElement.querySelector(".card__image").src = this._link;
    this._cardElement.querySelector(".card__label").textContent = this._name;
    //cardImage.alt = this._name;
    //cardImage.src = this._link;
    //cardTitle.textcontent = this._name;
    //set eventListeners
    this._setEventListeners();
    //return the card
    return this._cardElement;
  }
}
