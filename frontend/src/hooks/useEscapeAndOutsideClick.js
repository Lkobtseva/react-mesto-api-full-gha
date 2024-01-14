import { useEffect } from "react";

const useEscapeAndOutsideClick = (ref, onClose, isOpen) => {
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape" && isOpen) {
                onClose();
            }
        };

        const handleOutsideClick = (event) => {
            if (isOpen && ref.current && !ref.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            document.addEventListener("mousedown", handleOutsideClick);
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [ref, isOpen]);
};

export default useEscapeAndOutsideClick;