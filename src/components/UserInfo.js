export default class UserInfo {
  constructor({ nameElement, jobElement }, avatarElement) {
    this._nameElement = document.querySelector(nameElement);
    this._jobElement = document.querySelector(jobElement);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent.trim(),
      description: this._jobElement.textContent.trim(),
    };
  }

  setUserInfo({ name, description }) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = description;
  }

  updateAvatar(avatarUser) {
    this._avatar.src = avatarUser;
  }
}
