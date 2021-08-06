import React from "react";
import {
  BsFillEnvelopeFill,
  BsGeo,
  BsPencilSquare,
  BsPhone,
  BsTrash,
} from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import AnimalAlert from "../components/AnimalAlert";
import AnimalList from "../components/AnimalList";
import AnimalModal from "../components/AnimalModal";
import ClientAlert from "../components/ClientAlert";
import ClientModal from "../components/ClientModal";
import Layout from "../components/Layout";
import { Animal } from "../entities/Animal";
import { Client } from "../entities/Client";
import { AnimalValues, DEFAULT_ANIMAL_VALUES } from "../schemas/animalSchema";
import { ClientValues, DEFAULT_CLIENT_VALUES } from "../schemas/clientSchema";
import animalService from "../services/animalService";
import clientService from "../services/clientService";
import "../styles/ClientPage.css";

const ClientPage = ({ match }: any) => {
  const [client, setClient] = React.useState<Client | undefined>();
  const [showClientModal, setShowClientModal] = React.useState<boolean>(false);
  const [showAnimalModal, setShowAnimalModal] = React.useState<boolean>(false);
  const [showClientAlert, setShowClientAlert] = React.useState<boolean>(false);
  const [animalAlert, setAnimalAlert] = React.useState<number | undefined>();
  const [clientformValues, setClientFormValues] = React.useState<ClientValues>(
    DEFAULT_CLIENT_VALUES
  );
  const [animalformValues, setAnimalFormValues] = React.useState<AnimalValues>(
    DEFAULT_ANIMAL_VALUES
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
    if (client) {
      const response = await clientService.remove(client.id);

      if (response.ok) {
        closeClientAlert();
        history.push("/");
      }
    }
  };

  const updateClient = (updatedClient: ClientValues) => {
    if (client) {
      setClient({ ...(updatedClient as Client), animals: client.animals });
    }
  };

  const deleteAnimal = async () => {
    if (client?.id && animalAlert) {
      const response = await animalService.remove(client.id, animalAlert);

      if (response.ok) {
        setClient({
          ...client,
          animals: client.animals.filter((animal) => animal.id !== animalAlert),
        });
        closeAnimalAlert();
      }
    }
  };

  const updateAnimal = (animal: AnimalValues) => {
    if (client) {
      if (animalformValues.id) {
        setClient({
          ...client,
          animals: client.animals.map((a) =>
            a.id === animal.id ? (animal as Animal) : a
          ),
        });
      } else {
        setClient({
          ...client,
          animals: [...client.animals, animal as Animal],
        });
      }
    }
  };

  const openClientModalToEdit = () => {
    setClientFormValues(client as ClientValues);
    setShowClientModal(true);
  };

  const closeClientModal = () => setShowClientModal(false);

  const openClientAlertToDelete = () => {
    setShowClientAlert(true);
  };

  const closeClientAlert = () => setShowClientAlert(false);

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
                <h1>{client.firstname + " " + client.lastname}</h1>
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
                <div className="actions">
                  <button className="circle" onClick={openClientModalToEdit}>
                    <BsPencilSquare />
                  </button>
                  <button className="circle" onClick={openClientAlertToDelete}>
                    <BsTrash />
                  </button>
                </div>
              </div>

              <div className="header action-button">
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
                clientId={client.id}
              />
            </>
          )}
          <ClientAlert
            isVisible={showClientAlert}
            client={client}
            closeEvent={closeClientAlert}
            confirmEvent={deleteClient}
          />
          <ClientModal
            isVisible={showClientModal}
            close={closeClientModal}
            formValues={clientformValues}
            refreshView={updateClient}
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
            refreshView={updateAnimal}
            clientId={client?.id}
          />
        </div>
      </div>
    </Layout>
  );
};

export default ClientPage;
