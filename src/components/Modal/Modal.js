import { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

const modalContainer = document.querySelector("#modal-root");

function Modal({ onCloseModal, children }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Escape") {
        onCloseModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onCloseModal]);

  return createPortal(
    <div className="Overlay" onClick={onCloseModal}>
      <div className="Modal">{children}</div>
    </div>,
    modalContainer
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Modal;
