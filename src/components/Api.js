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
    /*.catch((err) => {
        console.error(err); // log the error to the console
      });
      */
  }

  // other methods for working with the API
}
