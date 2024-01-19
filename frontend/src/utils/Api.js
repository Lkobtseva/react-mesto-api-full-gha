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
        const token = localStorage.getItem("jwt");
        return fetch(`${this._url}/cards`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`,
              },
        }).then((res) => this._checkResponce(res));
    }
    addNewCard(data) {
        const token = localStorage.getItem("jwt");
        return fetch(`${this._url}/cards`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`,
              },
            body: JSON.stringify(data),
        }).then((res) => this._checkResponce(res));
    }
    removeCard(card) {
        const token = localStorage.getItem("jwt");
        return fetch(`${this._url}/cards/${card}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`,
              },
        }).then((res) => this._checkResponce(res));
    }
    getProfileInfo() {
        const token = localStorage.getItem("jwt");
        return fetch(`${this._url}/users/me`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`,
              },
        }).then((res) => this._checkResponce(res));
    }
    editUserProfile(data) {
        const token = localStorage.getItem("jwt");
        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`,
              },
            body: JSON.stringify(data),
        }).then((res) => this._checkResponce(res));
    }
    editProfileAvatar(data) {
        const token = localStorage.getItem("jwt");
        return fetch(`${this._url}/users/me/avatar`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`,
              },
            body: JSON.stringify(data),
        }).then((res) => this._checkResponce(res));
    }
    likeCard(cardId) {
        const token = localStorage.getItem("jwt");
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`,
              },
        }).then((res) => this._checkResponce(res));
    }
    unlikeCard(cardId) {
        const token = localStorage.getItem("jwt");
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`,
              },
        }).then((res) => this._checkResponce(res));
    }
}
const api = new Api({
    url: "https://api.lkobtseva.nomoredomainsmonster.ru",
});

export default api;