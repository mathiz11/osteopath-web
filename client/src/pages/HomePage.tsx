import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import ClientAlert from "../components/ClientAlert";
import ClientList from "../components/ClientList";
import ClientModal from "../components/ClientModal";
import Layout from "../components/Layout";
import { Client } from "../entities/Client";
import { ClientValues, DEFAULT_CLIENT_VALUES } from "../schemas/clientSchema";
import clientService from "../services/clientService";
import "../styles/HomePage.css";

const HomePage = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [alert, setAlert] = useState<number | undefined>();
  const [clientformValues, setClientFormValues] = useState<ClientValues>(
    DEFAULT_CLIENT_VALUES
  );

  useEffect(() => {
    getAllClients();
  }, []);

  const getAllClients = async () => {
    const response = await clientService.getAll();
    const { clients } = await response.json();
    setClients(clients);
  };

  const deleteClient = async () => {
    if (alert) {
      const response = await clientService.remove(alert);

      if (response.ok) {
        setClients(clients.filter((client) => client.id !== alert));
        closeAlert();
      }
    }
  };

  const updateClient = (client: ClientValues) => {
    if (clientformValues.id) {
      setClients(
        clients.map((c) => (c.id === client.id ? (client as Client) : c))
      );
    } else {
      setClients([...clients, client as Client]);
    }
  };

  const openModalToCreate = () => {
    if (clientformValues.id) {
      setClientFormValues(DEFAULT_CLIENT_VALUES);
    }
    setShowModal(true);
  };

  const openModalToEdit = (clientId: number | undefined) => {
    if (clientId) {
      setClientFormValues(
        clients
          .filter((client) => client.id === clientId)
          .map((client) => {
            delete client.userId;
            return client;
          })
          .pop() as ClientValues
      );
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
      <div className="home">
        <div className="container">
          <div className="header add-button">
            <h1>Clients</h1>
            <button className="primary" onClick={openModalToCreate}>
              <FaPlus />
              <span>Ajouter</span>
            </button>
          </div>
          <ClientList
            clients={clients}
            editEvent={openModalToEdit}
            deleteEvent={openAlertToDelete}
          />
          <ClientAlert
            isVisible={alert !== undefined}
            client={
              alert
                ? clients.filter((client) => client.id === alert).pop()
                : undefined
            }
            closeEvent={closeAlert}
            confirmEvent={deleteClient}
          />
          <ClientModal
            isVisible={showModal}
            close={closeModal}
            formValues={clientformValues}
            refreshView={updateClient}
          />
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
