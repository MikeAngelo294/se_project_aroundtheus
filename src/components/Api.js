export default class Api {
  constructor({ baseUrl, headers }) {
    // constructor body
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json; //server response
    }
    return Promise.reject(`Error ${res.status}`); //rejects promise to servor if error
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._handleResponse);
    /*.then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
      */
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._handleResponse);
    /*.then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      }); */
  }

  getAllInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  ///post cards
  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._handleResponse);
  }

  updateUserInfo(userData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: userData.title,
        about: userData.description,
      }),
    }).then(this._handleResponse);
  }
}
