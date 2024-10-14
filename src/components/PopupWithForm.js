import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._form = this._popupElement.querySelector(".modal__form");
    this._inputListing = this._popupElement.querySelectorAll(".modal__input");
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._form.querySelector(".modal__button");
  }

  //data from all input fields
  _getInputValues() {
    this.inputValue = {};
    this._inputListing.forEach((input) => {
      this.inputValue[input.name] = input.value;
    });

    //returns as object
    return this.inputValue;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      //this.close();
    });
  }
}
