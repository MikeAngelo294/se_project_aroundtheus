export default class UserInfo {
  constructor({ nameElement, jobElement, avatarElement }) {
    this._nameElement = document.querySelector(nameElement);
    this._jobElement = document.querySelector(jobElement);
    this._avatarElement = document.querySelector(avatarElement);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent.trim(),
      description: this._jobElement.textContent.trim(),
      avatarUser: this._avatarElement.src,
    };
  }

  setUserInfo({ name, description }) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = description;
  }

  updateAvatar(avatarUser) {
    this._avatarElement.src = avatarUser;
    this._avatarElement.alt = this._nameElement.textContent;
  }
}
