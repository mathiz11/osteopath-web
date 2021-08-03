import { ReactElement } from "react";
import { FaTimes } from "react-icons/fa";
import "../styles/Modal.css";

type ModalProps = {
  title?: string;
  close: () => void;
  entity: any;
  form: ReactElement;
};

const Modal = ({ title, close, entity, form }: ModalProps) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="header">
          <span>{title}</span>
          <button onClick={close}>
            <FaTimes size="16" />
          </button>
        </div>
        <div className="content">{form}</div>
        {!form && (
          <div className="footer">
            <button className="secondary">Annuler</button>
            <button className="primary">Ajouter</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
