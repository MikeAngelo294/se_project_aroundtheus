import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._form = this._popupElement.querySelector(".modal__form");
    this._input = this._form.querySelectorAll(".modal__input");
    this._handleFormSubmit = handleFormSubmit;
  }

  //data from all input fields
  _getInputValues() {
    this._inputValues = {};
    this._input.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });

    //returns as object
    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
