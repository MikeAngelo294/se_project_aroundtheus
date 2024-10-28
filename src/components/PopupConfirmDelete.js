import Popup from "./Popup";
export default class PopupConfirmDelete extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    //The cardId in the URL should be replaced with the _id parameter of the card to be deleted.
    this._card = null;
    this._cardId = null;

    this._deleteCardButton = this._popupElement.querySelector(
      ".modal__button_remove"
    );
    this._submit = false;
  }

  open(card, cardId) {
    this._card = card;
    this._cardId = cardId;
    super.open();
  }

  getSubmit() {
    return this._submit;
  }

  confirmDelete(callback) {
    this._handleFormSubmit = callback;
  }

  setEventListeners() {
    super.setEventListeners();
    this._deleteCardButton.addEventListener("click", (event) => {
      event.preventDefault();
      this._submit = true;
      this._handleFormSubmit(this._card, this._cardId);
    });
  }
}
