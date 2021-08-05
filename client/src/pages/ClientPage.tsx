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
import AnimalModal from "../components/AnimalModal";
import { AnimalValues, DEFAULT_ANIMAL_VALUES } from "../schemas/animalSchema";
import AnimalAlert from "../components/AnimalAlert";
import animalService from "../services/animalService";

const ClientPage = ({ match }: any) => {
  const [client, setClient] = React.useState<Client | undefined>();
  const [showClientModal, setShowClientModal] = React.useState<boolean>(false);
  const [showAnimalModal, setShowAnimalModal] = React.useState<boolean>(false);
  const [clientAlert, setClientAlert] = React.useState<number | undefined>();
  const [animalAlert, setAnimalAlert] = React.useState<number | undefined>();
  const [clientformValues, setClientFormValues] = React.useState<ClientValues>(
    DEFAULT_CLIENT_VALUES
  );
  const [animalformValues, setAnimalFormValues] = React.useState<AnimalValues>(
    DEFAULT_ANIMAL_VALUES
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
    if (clientAlert) {
      const response = await clientService.remove(clientAlert);

      if (response.ok) {
        closeClientAlert();
        history.push("/");
      }
    }
  };

  const deleteAnimal = async () => {
    if (client?.id && animalAlert) {
      const response = await animalService.remove(client.id, animalAlert);

      if (response.ok) {
        const clientCopy = { ...client };
        clientCopy.animals = clientCopy.animals.filter(
          (animal) => animal.id !== animalAlert
        );
        setClient(clientCopy);
        closeAnimalAlert();
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
      id: client?.id,
    });
  };

  const closeActionsMenu = () => setActionsMenu(DEFAULT_ACTIONS_MENU_VALUES);

  const openClientModalToEdit = (clientId: number | undefined) => {
    if (clientId) {
      setClientFormValues(client as ClientValues);
      setShowClientModal(true);
    }
  };

  const closeClientModal = () => setShowClientModal(false);

  const openClientAlertToDelete = (clientId: number | undefined) => {
    if (clientId) {
      setClientAlert(clientId);
    }
  };

  const closeClientAlert = () => setClientAlert(undefined);

  const openAnimalModalToCreate = () => {
    if (animalformValues.id) {
      setAnimalFormValues(DEFAULT_ANIMAL_VALUES);
    }
    setShowAnimalModal(true);
  };

  const openAnimalModalToEdit = (animalId: number | undefined) => {
    if (animalId && client) {
      setAnimalFormValues(
        client.animals
          .filter((animal) => animal.id === animalId)
          .map((animal) => {
            delete animal.clientId;
            return animal;
          })
          .pop() as AnimalValues
      );
      setShowAnimalModal(true);
    }
  };

  const closeAnimalModal = () => setShowAnimalModal(false);

  const openAnimalAlertToDelete = (animalId: number | undefined) => {
    if (animalId) {
      setAnimalAlert(animalId);
    }
  };

  const closeAnimalAlert = () => setAnimalAlert(undefined);

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
                <button className="primary" onClick={openAnimalModalToCreate}>
                  <FaPlus />
                  <span>Ajouter</span>
                </button>
              </div>
              <AnimalList
                animals={client.animals}
                editEvent={openAnimalModalToEdit}
                deleteEvent={openAnimalAlertToDelete}
              />
            </>
          )}
          <ActionsMenu
            isVisible={actionsMenu.id !== undefined}
            close={closeActionsMenu}
            editEvent={openClientModalToEdit}
            deleteEvent={openClientAlertToDelete}
            values={actionsMenu}
          />
          <ClientAlert
            isVisible={clientAlert !== undefined}
            client={client}
            closeEvent={closeClientAlert}
            confirmEvent={deleteClient}
          />
          <ClientModal
            isVisible={showClientModal}
            close={closeClientModal}
            formValues={clientformValues}
            refreshView={getClient}
          />
          <AnimalAlert
            isVisible={animalAlert !== undefined}
            animalName={
              client?.animals
                .filter((animal) => animal.id === animalAlert)
                .pop()?.name
            }
            closeEvent={closeAnimalAlert}
            confirmEvent={deleteAnimal}
          />
          <AnimalModal
            isVisible={showAnimalModal}
            close={closeAnimalModal}
            formValues={animalformValues}
            refreshView={getClient}
            clientId={client?.id}
          />
        </div>
      </div>
    </Layout>
  );
};

export default ClientPage;
