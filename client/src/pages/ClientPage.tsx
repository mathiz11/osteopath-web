import React from "react";
import clientService from "../services/clientService";
import { Client } from "../entities/Client";
import Layout from "../components/Layout";
import { FaPlus } from "react-icons/fa";
import { BsFillEnvelopeFill, BsGeo, BsPhone } from "react-icons/bs";
import { HiDotsVertical } from "react-icons/hi";
import "../styles/ClientPage.css";
import AnimalList from "../components/AnimalList";
import ClientModal from "../components/ClientModal";
import { ClientValues, DEFAULT_CLIENT_VALUES } from "../schemas/clientSchema";
import ActionsMenu, {
  ActionsMenuValues,
  DEFAULT_ACTIONS_MENU_VALUES,
} from "../components/ActionsMenu";
import ClientAlert from "../components/ClientAlert";
import { useHistory } from "react-router-dom";

const ClientPage = ({ match }: any) => {
  const [client, setClient] = React.useState<Client | undefined>();
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [alert, setAlert] = React.useState<number | undefined>();
  const [clientformValues, setClientFormValues] = React.useState<ClientValues>(
    DEFAULT_CLIENT_VALUES
  );
  const [actionsMenu, setActionsMenu] = React.useState<ActionsMenuValues>(
    DEFAULT_ACTIONS_MENU_VALUES
  );
  const history = useHistory();

  React.useEffect(() => {
    getClient();
  }, []);

  const getClient = async () => {
    if (match.params.clientId) {
      const response = await clientService.getOne(match.params.clientId);
      const jsonResponse = await response.json();
      setClient(jsonResponse.client);
    }
  };

  const deleteClient = async () => {
    if (alert) {
      const response = await clientService.remove(alert);

      if (response.ok) {
        closeAlert();
        history.push("/");
      }
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setActionsMenu({
      x:
        e.nativeEvent.x + 150 > window.innerWidth
          ? e.nativeEvent.pageX - 150
          : e.nativeEvent.pageX,
      y:
        e.nativeEvent.y + 130 > window.innerHeight
          ? e.nativeEvent.pageY - 130
          : e.nativeEvent.pageY,
      clientId: client?.id,
    });
  };

  const closeActionsMenu = () => setActionsMenu(DEFAULT_ACTIONS_MENU_VALUES);

  const openModalToEdit = (clientId: number | undefined) => {
    if (clientId) {
      setClientFormValues(client as ClientValues);
      setShowModal(true);
    }
  };

  const closeModal = () => setShowModal(false);

  const openAlertToDelete = (clientId: number | undefined) => {
    if (clientId) {
      setAlert(clientId);
    }
  };

  const closeAlert = () => setAlert(undefined);

  return (
    <Layout>
      <div className="client">
        <div className="container">
          {client && (
            <>
              <div className="client-info">
                <div className="client-info-name">
                  <span>{client.firstname}</span>
                  <span>{client.lastname}</span>
                </div>
                <div className="client-info-detail">
                  <div className="client-info-detail-item">
                    <BsFillEnvelopeFill />
                    <span>{client.email}</span>
                  </div>
                  <div className="client-info-detail-item">
                    <BsPhone />
                    <span>{client.phone}</span>
                  </div>
                  <div className="client-info-detail-item">
                    <BsGeo />
                    <span>{client.address}</span>
                  </div>
                </div>
                <div className="client-info-button">
                  <button className="circle pure" onClick={handleClick}>
                    <HiDotsVertical size="18" />
                  </button>
                </div>
              </div>

              <div className="header add-button">
                <h2>Animaux</h2>
                <button className="primary" onClick={(e) => handleClick(e)}>
                  <FaPlus />
                  <span>Ajouter</span>
                </button>
              </div>
              <AnimalList animals={client.animals} />
            </>
          )}
          <ActionsMenu
            isVisible={actionsMenu.clientId !== undefined}
            close={closeActionsMenu}
            editEvent={openModalToEdit}
            deleteEvent={openAlertToDelete}
            values={actionsMenu}
          />
          <ClientAlert
            isVisible={alert !== undefined}
            client={client}
            closeEvent={closeAlert}
            confirmEvent={deleteClient}
          />
          <ClientModal
            isVisible={showModal}
            close={closeModal}
            formValues={clientformValues}
            refreshView={getClient}
          />
        </div>
      </div>
    </Layout>
  );
};

export default ClientPage;
