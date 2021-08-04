import { ReactElement } from "react";
import "../styles/Alert.css";

type AlertProps = {
  title: string;
  text: ReactElement;
  type: "delete";
  buttonName: string;
  close: () => void;
  confirmEvent: () => void;
};

const Alert = ({
  title,
  text,
  type,
  buttonName,
  close,
  confirmEvent,
}: AlertProps) => {
  return (
    <div className="alert-container" onClick={close}>
      <div className="alert">
        <div className="header">{title}</div>
        <div className="content">{text}</div>
        <div className="footer">
          <button className="secondary" onClick={close}>
            Annuler
          </button>
          <button className={`primary ${type}`} onClick={confirmEvent}>
            {buttonName}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
