import { Client } from "../entities/Client";
import Alert from "./Alert";

type ClientAlertProps = {
  isVisible: boolean;
  client: Client | undefined;
  closeEvent: () => any;
  confirmEvent: () => any;
};

const ClientAlert = ({
  isVisible,
  client,
  closeEvent,
  confirmEvent,
}: ClientAlertProps) => {
  const getClientFullName = (client: Client | undefined) =>
    client ? ` ${client.firstname} ${client.lastname} ` : null;

  return isVisible ? (
    <Alert
      title="Supprimer client"
      text={
        <>
          <p>
            Voulez-vous vraiment supprimez votre client :
            {getClientFullName(client)}?
          </p>
          <p>(Tous ces animaux seront supprimés définitivement)</p>
        </>
      }
      type="delete"
      buttonName="Supprimer"
      closeEvent={closeEvent}
      confirmEvent={confirmEvent}
    />
  ) : null;
};

export default ClientAlert;
