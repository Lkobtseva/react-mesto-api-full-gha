import React from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../context/CurrentUserContext.js";
function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <div className='Main'>
            <section className="profile">
                <div className="profile__block">
                    <div className="profile__container">
                        <img className="profile__avatar" src={currentUser.avatar} alt={currentUser.name} />
                        <button className="profile__edit-avatar" onClick={props.onEditAvatar}></button>
                    </div>
                    <div className="profile__info">
                        <div className="profile__edit">
                            <h1 className="profile__title">{currentUser.name}</h1>
                            <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
                        </div>
                        <h2 className="profile__subtitle">{currentUser.about}</h2>
                    </div>
                </div>
                <button className="profile__button" type="button" onClick={props.onAddPlace}></button>
            </section>
            <section className="cards">
                <ul className="cards__list">
                    {props.cards.map((card) => (
                         <Card
                         key={card._id}
                         {...card}
                         onCardClick={props.onCardClick}
                         onCardLike={props.onCardLike}
                         onCardDelete={props.onCardDelete}
                       />
                    ))}
                </ul>
            </section>
        </div>
    );
}

export default Main;