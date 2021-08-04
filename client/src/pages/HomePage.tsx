import { Formik } from "formik";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Alert from "../components/Alert";
import ClientList from "../components/ClientList";
import Input from "../components/Input";
import Layout from "../components/Layout";
import Message, { MessageType } from "../components/Message";
import Modal from "../components/Modal";
import { ActionType, useStore } from "../components/Store";
import { Client } from "../entities/Client";
import {
  ClientSchema,
  ClientValues,
  DEFAULT_CLIENT_VALUES,
} from "../schemas/clientSchema";
import clientService from "../services/clientService";
import "../styles/HomePage.css";
import { translateMessage } from "../utils/responseMessage";

const HomePage: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [alert, setAlert] = useState<number | undefined>();
  const [formInitialValues, setFormInitialValues] = useState<ClientValues>(
    DEFAULT_CLIENT_VALUES
  );
  const [, dispatch] = useStore();

  React.useEffect(() => {
    getAllClients();
  }, []);

  const closeModal = () => setShowModal(false);

  const closeAlert = () => setAlert(undefined);

  const getAllClients = async () => {
    const response = await clientService.getAll();
    const { clients } = await response.json();
    setClients(clients);
  };

  const openModalToEdit = (clientId: number | undefined) => {
    if (clientId) {
      setFormInitialValues(
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

  const getClientFullName = (client: Client | undefined) =>
    client ? client.firstname + " " + client.lastname : null;

  const openModalToDelete = (clientId: number | undefined) => {
    if (clientId) {
      setAlert(clientId);
    }
  };

  const deleteClient = async () => {
    if (alert) {
      const response = await clientService.remove(alert);

      if (response.ok) {
        getAllClients();
        closeAlert();
      }
    }
  };

  return (
    <Layout>
      <div className="home">
        <div className="container">
          <div className="header add-button">
            <h1>Clients</h1>
            <button className="primary" onClick={() => setShowModal(true)}>
              <FaPlus />
              <span>Ajouter</span>
            </button>
          </div>
          <ClientList
            clients={clients}
            editEvent={openModalToEdit}
            deleteEvent={openModalToDelete}
          />
          {alert && (
            <Alert
              title="Supprimer client"
              text={`Voulez-vous vraiment supprimez votre client : ${getClientFullName(
                clients.filter((client) => client.id === alert).pop()
              )} ?`}
              type="delete"
              buttonName="Supprimer"
              close={closeAlert}
              confirmEvent={deleteClient}
            />
          )}
          {showModal && (
            <Modal close={closeModal} title="Ajouter un client">
              <Formik
                initialValues={formInitialValues}
                validateOnChange={false}
                validateOnBlur={false}
                validationSchema={ClientSchema}
                onSubmit={async (values) => {
                  const response = formInitialValues.id
                    ? await clientService.edit(values)
                    : await clientService.create(values);

                  if (response.ok) {
                    getAllClients();
                    closeModal();
                  } else {
                    const jsonResponse = await response.json();
                    dispatch({
                      type: ActionType.SET_MESSAGE,
                      payload: {
                        type: MessageType.ERROR,
                        text: translateMessage(
                          jsonResponse.message,
                          response.ok
                        ),
                      },
                    });
                  }
                }}
              >
                {({ values, handleChange, handleSubmit, errors }) => (
                  <form onSubmit={handleSubmit}>
                    <Message />
                    <Input
                      id="firstname"
                      label="Prénom"
                      type="text"
                      onChange={handleChange}
                      value={values.firstname}
                      error={errors.firstname}
                      isRequired
                    />
                    <Input
                      id="lastname"
                      label="Nom"
                      type="text"
                      onChange={handleChange}
                      value={values.lastname}
                      error={errors.lastname}
                      isRequired
                    />
                    <Input
                      id="email"
                      label="Email"
                      type="text"
                      onChange={handleChange}
                      value={values.email}
                      error={errors.email}
                      isRequired
                    />
                    <Input
                      id="phone"
                      label="Téléphone"
                      type="text"
                      onChange={handleChange}
                      value={values.phone}
                      error={errors.phone}
                      isRequired
                    />
                    <Input
                      isTextArea
                      id="address"
                      label="Adresse"
                      onChange={handleChange}
                      value={values.address}
                      error={errors.address}
                      isRequired
                    />
                    <div className="center">
                      <button
                        className="primary"
                        type="submit"
                        disabled={
                          formInitialValues.id !== undefined &&
                          JSON.stringify(values) ===
                            JSON.stringify(formInitialValues)
                        }
                      >
                        {formInitialValues.id ? "Ajouter" : "Modifier"}
                      </button>
                    </div>
                  </form>
                )}
              </Formik>
            </Modal>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
