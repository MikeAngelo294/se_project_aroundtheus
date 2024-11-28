export default class UserInfo {
  constructor({ nameElement, jobElement, avatarElement }) {
    this._nameElement = document.querySelector(nameElement);
    this._jobElement = document.querySelector(jobElement);
    this._avatar = document.querySelector(avatarElement);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent.trim(),
      description: this._jobElement.textContent.trim(),
      avatar: this._avatar.src,
    };
  }

  setUserInfo(data) {
    this._nameElement.textContent = data.name;
    this._jobElement.textContent = data.description;
  }

  updateAvatar(avatar) {
    this._avatar.src = avatar;
  }
}
