import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ onSubmit, isOpen, onClose }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");
  // input change
  function handleNameChange(e) {
    setName(e.target.value);
  }
  // input change
  function handleLinkChange(e) {
    setLink(e.target.value);
  }
  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit({
      name: name,
      link: link,
    });
  }
  // clean inputs
  React.useEffect(() => {
    if (isOpen) {
      setName("");
      setLink("");
    }
  }, [isOpen]);
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title={"Новое место"}
      buttonText={"Создать"}
      name={"type_new-card"}
      form={"form_type_new-card"}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_name"
        type="text"
        name="name"
        id="card"
        autoComplete="off"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        onChange={handleNameChange}
        value={name}
      />
      <span className="error" id="card-error"></span>
      <input
        className="popup__input popup__input_type_link"
        type="url"
        name="link"
        id="link"
        autoComplete="off"
        placeholder="Ссылка на картинку"
        required
        onChange={handleLinkChange}
        value={link}
      />
      <span className="error" id="link-error"></span>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
