class FormValidator {
  ///similar to validation, exchanging this._
  constructor(config, formEl) {
    this._form = formEl;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
  }

  _showInputError(inputEl, validationMessage) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError(inputEl) {
    //const { inputErrorClass } = options;
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._errorClass);
  }

  _hasInvalidInput() {
    return !this._inputListing.every((inputEl) => inputEl.validity.valid);
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      return this._showInputError(inputEl);
    }
    this._hideInputError(inputEl);
  }

  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
      return;
    }
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _setEventListeners() {
    ///const { inputSelector, submitButtonSelector } = options;
    //this._inputEls = [...this.formEl.querySelectorAll(this._inputSelector)];
    this._inputListing = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    this._inputListing.forEach((inputEl) => {
      inputEl.addEventListener("input", (event) => {
        this._checkInputValidity(inputEl);
        this.toggleButtonState();
      });
    });
  }

  enableValidation() {
    //const formEls = [...document.querySelectorAll(options.formSelector)];
    //formEls.forEach((formEl) => {
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    this._setEventListeners();
    //});
  }

  resetFormValidation() {
    this.toggleButtonState();
    this._inputListing.forEach((inputEl) => {
      this._hideInputError(inputEl);
    });
  }
  //enableValidation(config);
}

export default FormValidator;
