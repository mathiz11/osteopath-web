import { Formik } from "formik";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import ClientList from "../components/ClientList";
import Input from "../components/Input";
import Layout from "../components/Layout";
import Message from "../components/Message";
import Modal from "../components/Modal";
import { Client } from "../entities/Client";
import {
  ClientSchema,
  ClientValues,
  DEFAULT_CLIENT_VALUES,
} from "../schemas/clientSchema";
import clientService from "../services/clientService";
import "../styles/HomePage.css";
import { MessageType } from "../utils/types";

const HomePage: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [message, setMessage] = React.useState<MessageType>({
    type: null,
    text: null,
  });
  const [formInitialValues, setFormInitialValues] = useState<ClientValues>(
    DEFAULT_CLIENT_VALUES
  );

  React.useEffect(() => {
    getAllClients();
  }, []);

  React.useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage({
          type: null,
          text: null,
        });
      }, 5000);
    }
  }, [message]);

  const closeModal = () => setShowModal(false);

  const getAllClients = async () => {
    const response = await clientService.getAll();
    const { clients } = await response.json();
    setClients(clients);
  };

  const openModalToEdit = (clientId: number) => {
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
          <ClientList clients={clients} editEvent={openModalToEdit} />
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
                  }
                }}
              >
                {({ values, handleChange, handleSubmit, errors }) => (
                  <form onSubmit={handleSubmit}>
                    {message.type && (
                      <Message type={message.type}>{message.text}</Message>
                    )}
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
