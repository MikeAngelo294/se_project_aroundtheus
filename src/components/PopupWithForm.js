import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._form = this._popupElement.querySelector(".modal__form");
    this._input = this._form.querySelectorAll(".modal__input");
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._form.querySelector(".modal__button");
  }

  getForm() {
    return this._form;
  }

  //data from all input fields
  _getInputValues() {
    this.inputValue = {};
    this._input.forEach((input) => {
      this.inputValue[input.name] = input.value;
    });

    //returns as object
    return this.inputValue;
  }

  setInputValues(data) {
    this._input.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }
}
