import { ReactElement } from "react";
import "../styles/Alert.css";

type AlertProps = {
  title: string;
  text: ReactElement;
  type: "delete";
  buttonName: string;
  closeEvent: () => void;
  confirmEvent: () => void;
};

const Alert = ({
  title,
  text,
  type,
  buttonName,
  closeEvent,
  confirmEvent,
}: AlertProps) => {
  return (
    <div className="alert-container">
      <div className="alert">
        <div className="header">{title}</div>
        <div className="content">{text}</div>
        <div className="footer">
          <button className="secondary" onClick={closeEvent}>
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
