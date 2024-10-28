export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleLikeIcon,
    handleDeleteCard
  ) {
    this._name = data.name;
    this._link = data.link;
    this.id = data._id;
    this._isLiked = data.isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleLikeIcon = handleLikeIcon;
    this.handleDeleteCard = handleDeleteCard;
  }

  _setEventListeners() {
    //.'.card__like-button';
    this._likeButton.addEventListener("click", () => {
      this._handleLikeIcon(this);
    });
    //".card__delete-button"
    this._deleteButton.addEventListener("click", () => {
      this.handleDeleteCard(this.id, this);
    });
    //".card__image"
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  setIsliked(isLiked) {
    this._isLiked = isLiked;
    this._renderLike();
  }

  _renderLike() {
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  getIsLiked() {
    return this._isLiked;
  }

  handleDelete() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getCardId() {
    return this.id;
  }

  _handleLikeIcon() {
    //this._cardElement
    // .querySelector(".card__like-button")
    // .classList.toggle("card__like-button_active");
    this._likeButton.classList.toggle("card__like-button_active");
  }
  /*
  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }*/

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    //this._cardElement = this._getTemplate();
    //likebutton
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    //card delete button
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    //get card viewer with image and title
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
    this._cardElement.querySelector(".card__label").textContent = this._name;
    //set eventListeners
    this._setEventListeners();

    this._renderLike(this._isLiked);
    //return the card
    return this._cardElement;
  }
}
