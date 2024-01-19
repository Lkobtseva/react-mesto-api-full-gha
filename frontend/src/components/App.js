import React, { useEffect } from "react";
import { Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import Header from "./Header.js";
import Main from "./Main.js";
import api from "../utils/Api.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../context/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import authApi from "../utils/ApiAuth.js";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login.js";
import InfoTooltip from "./InfoTooltip.js";
import Register from "./Register.js";
import useEscapeAndOutsideClick from "../hooks/useEscapeAndOutsideClick.js";


function App() {
  const navigate = useNavigate();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isInfoTolltipSuccess, setIsInfoTolltipSuccess] = React.useState(false);
  const [headerEmail, setHeaderEmail] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isSuccessPopupOpen ||
    selectedCard;

  // попап редактирования
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  //popup удаление
  function handleDeleteClick() {
    setIsDeletePopupOpen(true);
  }
  // попап добавления
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  // попап аватара
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
 
  // закрытие всех попапов
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsSuccessPopupOpen(false);
  }
  useEscapeAndOutsideClick(() => {
    closeAllPopups();
  }, isOpen);

  React.useEffect(() => {
    if (isLoggedIn)
    Promise.all([api.getProfileInfo(), api.getInitialCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((err) => console.log(err));
  }, [isLoggedIn]);

  // like
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    if (!isLiked) {
      api
        .likeCard(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(err));
    } else {
      api
        .unlikeCard(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(err));
    }
  }

  // trash
  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then((newCard) => {
        const newCards = cards.filter((c) =>
          c._id === card._id ? "" : newCard
        );
        setCards(newCards);
      })
      .catch((err) => console.log(err));
  }

  // update user
  function handleUpdateUser(data) {
    api
      .editUserProfile(data)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }
  // update avatar
  function handleUpdateAvatar(data) {
    api
      .editProfileAvatar(data)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }
  // update cards
  function handleAddPlaceSubmit(data) {
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
    setIsLoading(true);
  }

  // регистрация пользователя
  function handleRegisterUser(email, password) {
    authApi
      .registerUser(email, password)
      .then((data) => {
        if (data) {
          setIsInfoTolltipSuccess(true);
          navigate("/sing-in", { replace: true })
        }
      })
      .catch((err) => {
        setIsInfoTolltipSuccess(false); // failed
        console.log(err);
      })
      .finally(() => setIsSuccessPopupOpen(true));
  }

  // аутентификация пользователя
  function handleAuthUser(email, password) {
    authApi.loginUser(email, password)
      .then((data) => {
        if (data.token) {
          setHeaderEmail(email);
          setIsLoggedIn(true);
          localStorage.setItem("jwt", data.token);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        setIsInfoTolltipSuccess(false); // failed
        setIsSuccessPopupOpen(true);
        console.log(err);
      });
  }
  // проверка токена
useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      authApi
        .checkToken(jwt)
        .then((data) => {
          if (data) {
            setIsLoggedIn(true); // вход выполнен
            setHeaderEmail(data.data.email);
            navigate("/");
          }
        })
        .catch((err) => console.log(err));
    }
  }, [navigate]);

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn, navigate]);

  // удаление токена
  function handleSingOut() {
    localStorage.removeItem("jwt");
    setHeaderEmail("");
    setIsLoggedIn(false); // вход не выполнен
    setCurrentUser({});
    navigate("/sign-in", { replace: true });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Header
            onSignOut={handleSingOut}
            headerEmail={headerEmail} 
            isLoggedIn={isLoggedIn}
            />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  element={Main}
                  onAddPlace={handleAddPlaceClick}
                  onEditProfile={handleEditProfileClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onDelete={handleDeleteClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  isLoggedIn={isLoggedIn}
                />
              }
            />
            <Route
              path="/sign-up"
              element={<Register onRegister={handleRegisterUser} />}
            />
            <Route
              path="/sign-in"
              element={<Login onLogin={handleAuthUser} />}
            />
             <Route path="*" element={<Navigate to="/sign-in" />} />
          </Routes>
          <Footer />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleAddPlaceSubmit}
            isLoading={isLoading}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateUser}
            isLoading={isLoading}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleUpdateAvatar}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />
          <PopupWithForm
            isOpen={isDeletePopupOpen}
            onClose={closeAllPopups}
            title={"Вы уверены?"}
            buttonText={"Да"}
            name={"type_delete-card"}
            form={"form_type_delete-card"}
          />
          <ImagePopup
            isOpen={selectedCard}
            card={selectedCard}
            onClose={closeAllPopups}
          />
          <InfoTooltip
            name={"success"}
            onClose={closeAllPopups}
            isOpen={isSuccessPopupOpen}
            isSuccess={isInfoTolltipSuccess}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;