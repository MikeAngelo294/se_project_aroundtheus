import Popup from "./Popup";
export default class PopupConfirmDelete extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    //The cardId in the URL should be replaced with the _id parameter of the card to be deleted.
    this._card = null;
    this._cardId = null;

    this._cardDeleteButton = this._popupElement.querySelector(
      ".modal__button_remove"
    );
    this._submitDelete = false;
  }

  open(card, cardId) {
    super.open();
    this._card = card;
    this._cardId = cardId;
  }

  submitDelete() {
    return this._submitDelete;
  }

  confirmDelete(api) {
    this._handleFormSubmit = api;
  }

  setEventListeners() {
    super.setEventListeners();
    this._cardDeleteButton.addEventListener("click", (event) => {
      event.preventDefault();
      this._submitDelete = true;
      this._handleFormSubmit(this._cardId, this._card);
    });
  }
}
