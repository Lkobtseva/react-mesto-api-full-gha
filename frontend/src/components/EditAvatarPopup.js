import React from "react";
import PopupWithForm from "./PopupWithForm";
function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const ref = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({ avatar: ref.current.value });
  }
  // clean inputs
  React.useEffect(() => {
    ref.current.value = "";
  }, [isOpen]);
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title={"Обновить аватар"}
      buttonText={"Сохранить"}
      name={"type_edit-avatar"}
      form={"form_type_edit-avatar"}
      onSubmit={handleSubmit}
    >
      <input
        ref={ref}
        type="url"
        className="popup__input popup__input_type_avatar"
        name="avatar"
        placeholder="Ссылка на новый аватар"
        autoComplete="off"
        id="avatar"
        minLength="2"
        required
      />
      <span className="error" id="avatar-error"></span>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
