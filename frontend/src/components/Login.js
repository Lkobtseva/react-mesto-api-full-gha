import React, { useState } from 'react';
import  { Navigate }  from 'react-router-dom';

function Login({ isLoggedIn, onLogin }) {
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
    console.log('Logging in...', email, password);
    onLogin(email, password);
  }

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <form onSubmit={handleSubmit} className="auth__form">
      <h2 className="auth__title">Вход</h2>
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
        Войти
      </button>
    </form>
  );
}
export default Login;