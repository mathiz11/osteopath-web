import Alert from "./Alert";

type AnimalAlertProps = {
  isVisible: boolean;
  animalName: string | undefined;
  closeEvent: () => any;
  confirmEvent: () => any;
};

const AnimalAlert = ({
  isVisible,
  animalName,
  closeEvent,
  confirmEvent,
}: AnimalAlertProps) => {
  return isVisible ? (
    <Alert
      title="Supprimer animal"
      text={
        <>
          <p>Voulez-vous vraiment supprimez l'animal : {animalName} ?</p>
          <p>(Toutes ces fiches seront supprimées définitivement)</p>
        </>
      }
      type="delete"
      buttonName="Supprimer"
      closeEvent={closeEvent}
      confirmEvent={confirmEvent}
    />
  ) : null;
};

export default AnimalAlert;
