class AuthApi {
    constructor(baseUrl) {
      this._baseUrl = baseUrl;
    }
    // проверяет есть ли ошибка
    _checkError(res, error) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Статус ошибки: ${res.status}`, error);
  
    }
    // регистрация пользователя
    registerUser(email, password) {
      return fetch(`${this._baseUrl}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }).then((res) => this._checkError(res));
    }
  
    // вход пользователя
    loginUser(email, password) {
      return fetch(`${this._baseUrl}/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }).then((res) => this._checkError(res));
    }
  
    // проверка токена
    checkToken(token) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }).then((res) => this._checkError(res));
    }
  }

  const authApi = new AuthApi("https://api.lkobtseva.nomoredomainsmonster.ru");
  
  export default authApi;
  
