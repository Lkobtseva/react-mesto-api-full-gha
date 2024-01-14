import React, { useRef } from "react";
import useEscapeAndOutsideClick from "../hooks/useEscapeAndOutsideClick.js";

export default function PopupWithForm(props) {
    const popupRef = useRef();
    useEscapeAndOutsideClick(popupRef, props.onClose, props.isOpen);

    return (
        <div
            className={`popup popup_${props.name} ${props.isOpen ? "popup_opened" : ""
                }`}
        >
            <div className="popup__container" ref={popupRef}>
                <button
                    className="popup__close-icon"
                    type="button"
                    onClick={props.onClose}
                ></button>
                <h2 className="popup__title">{props.title}</h2>
                <form className={`popup__form popup__${props.form}`} onSubmit={props.onSubmit}>
                    {props.children}
                    <button className="popup__button" type="submit">
                        {props.buttonText}
                    </button>
                </form>
            </div>
        </div>
    );
}
