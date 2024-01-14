class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }
    _checkResponce(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Статус ошибки: ${res.status}`);
    }
    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            method: "GET",
            headers: this._headers,
        }).then((res) => this._checkResponce(res));
    }
    addNewCard(data) {
        return fetch(`${this._url}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(data),
        }).then((res) => this._checkResponce(res));
    }
    removeCard(card) {
        return fetch(`${this._url}/cards/${card}`, {
            method: "DELETE",
            headers: this._headers,
        }).then((res) => this._checkResponce(res));
    }
    getProfileInfo() {
        return fetch(`${this._url}/users/me`, {
            method: "GET",
            headers: this._headers,
        }).then((res) => this._checkResponce(res));
    }
    editUserProfile(data) {
        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify(data),
        }).then((res) => this._checkResponce(res));
    }
    editProfileAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify(data),
        }).then((res) => this._checkResponce(res));
    }
    likeCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: "PUT",
            headers: this._headers,
        }).then((res) => this._checkResponce(res));
    }
    unlikeCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: "DELETE",
            headers: this._headers,
        }).then((res) => this._checkResponce(res));
    }
}
const api = new Api({
    url: "https://mesto.nomoreparties.co/v1/cohort-73",
    headers: {
        "content-type": "application/json",
        authorization: "c3be00b2-ec0b-4b8e-8979-18e6752e4cfe",
    },
});

export default api;