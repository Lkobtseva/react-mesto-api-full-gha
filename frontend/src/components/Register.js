import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

function Register({ isLoggedIn, onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(email, password);
  }

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="auth__form"
      name="register"
    >
      <h2 className="auth__title">Регистрация</h2>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="Email"
        value={email}
        className="auth__input"
        onChange={handleEmailChange}
        autoComplete="off"
        required
      />

      <input
        id="password"
        name="password"
        type="password"
        placeholder="Пароль"
        value={password}
        className="auth__input"
        onChange={handlePasswordChange}
        autoComplete="off"
        required
      />
      <button type="submit" className="auth__button">
        Зарегистрироваться
      </button>
      <div className="auth__sign">
        <Link to="/sign-in" className="auth__login-link">
          Уже зарегистрированы? Войти
        </Link>
      </div>
    </form>
  );
}
export default Register;