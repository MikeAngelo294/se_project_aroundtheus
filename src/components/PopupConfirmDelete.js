import Popup from "./Popup";
export default class PopupConfirmDelete extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
  }
}
