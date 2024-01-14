import React from "react";
import logo from '../images/logo.svg';
import { Link } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom';

function Header({ headerEmail, onSignOut }) {
    return (
        <header className="header">
            <Link to="/" className="header__logo">
                <img className="header__logo" src={logo} alt="Логотип" />
            </Link>

            <Routes>
                <Route path="/" element={
                    <>
                        <p className="header__email">{headerEmail}</p>
                        <button className="header__exit" onClick={onSignOut}>Выйти</button>
                    </>}
                />
                <Route path="sign-in" element={
                    <Link to="/sign-up" className="header__link">Регистрация</Link>}
                />
                <Route path="sign-up" element={

                    <Link to="/sign-in" className="header__link">Войти</Link>
                }
                />
            </Routes>
        </header>
    )
}

export default Header;

