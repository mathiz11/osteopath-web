import { FC } from "react";
import { FaTimes } from "react-icons/fa";
import "../styles/Modal.css";

type ModalProps = {
  title: string;
  close: () => void;
};

const Modal: FC<ModalProps> = ({ title, close, children }) => {
  return (
    <div className="modal-container" onClick={close}>
      <div className="modal">
        <div className="header">
          <span>{title}</span>
          <button onClick={close}>
            <FaTimes size="16" />
          </button>
        </div>
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
