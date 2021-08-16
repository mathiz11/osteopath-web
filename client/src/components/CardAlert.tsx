import Alert from "./Alert";

type CardAlertProps = {
  isVisible: boolean;
  cardNumber: number | undefined;
  closeEvent: () => void;
  confirmEvent: () => void;
};

const CardAlert = ({
  isVisible,
  cardNumber,
  closeEvent,
  confirmEvent,
}: CardAlertProps) => {
  return isVisible ? (
    <Alert
      title="Supprimer fiche"
      text={
        <p>Voulez-vous vraiment supprimez la fiche numéro {cardNumber} ?</p>
      }
      type="delete"
      buttonName="Supprimer"
      closeEvent={closeEvent}
      confirmEvent={confirmEvent}
    />
  ) : null;
};

export default CardAlert;
