import React, { useRef } from "react";
import useEscapeAndOutsideClick from "../hooks/useEscapeAndOutsideClick.js";


export default function ImagePopup(props) {
    const popupRef = useRef();

    useEscapeAndOutsideClick(popupRef, props.onClose, props.isOpen);

    return (
        <div
            className={`popup popup_type_open-card ${props.card ? "popup_opened" : ""}`}
        >
            <div className="popup__image-container" ref={popupRef}>
                <img
                    src={props.card ? props.card.link : ""}
                    alt={props.card ? props.card.name : ""}
                    className="popup__image"
                />
                <button type="button" className="popup__close-icon" onClick={props.onClose}></button>
                <h2 className="popup__image-title">
                    {props.card ? props.card.name : ""}
                </h2>
            </div>
        </div>
    );
}
