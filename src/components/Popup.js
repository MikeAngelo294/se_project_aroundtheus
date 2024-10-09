export default class Popup {
  constructor({ popupSelector }) {
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(popupSelector);
  }

  //open method
  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscape);
  }

  //close method
  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscape);
  }

  //for escape button
  _handleEscClose = (event) => {
    if (event.key === "Escape" && event.type === "keydown") {
      this.close();
    }
  };

  setEventListeners() {
    const closeButton = this._popupElement.querySelector(".modal__close");
    closeButton.addEventListener("click", () => {
      this.close();
    });

    this._popupElement.addEventListener("mousedown", (event) => {
      if (event.target.classList.contains("modal")) {
        this.close();
      }
    });
  }
}
