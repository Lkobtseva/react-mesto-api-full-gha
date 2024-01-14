import React from "react";

import { CurrentUserContext } from "../context/CurrentUserContext.js";
function Card(card) {
  const currentUser = React.useContext(CurrentUserContext);
  // мусорка
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `card__deletebutton ${
    isOwn ? "card__deletebutton_type_active" : ""
  }`;
  // лайк
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  console.log("Is liked:", isLiked);
  const cardLikeButtonClassName = `card__button ${
    isLiked ? "card__button_active" : ""
  }`;
  // картинка
  function handleClick() {
    card.onCardClick(card);
  }
  // лайк
  function handleLikeClick() {
    card.onCardLike(card);
  }
  // удаление
  function handleDeleteClick() {
    card.onCardDelete(card);
  }
    return (
        <li className="card">
            <img
                className="card__image"
                src={card.link}
                alt={card.name}
                onClick={handleClick}
            />
            <button
                type="reset"
                className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
            />
            <div className="card__text">
                <h2 className="card__title">{card.name}</h2>
                <div className="card__like-container">
                    <button
                   
                       alt="Иконка лайка"
                       className={cardLikeButtonClassName}
                       onClick={handleLikeClick}
                    ></button>
                    <span className="card__like-number">{card.likes.length}</span>
                </div>
            </div>
        </li>

    );
}
export default Card;
