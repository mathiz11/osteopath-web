import React, { useState } from "react";
import Layout from "../components/Layout";
import clientService from "../services/clientService";
import { FaPlus } from "react-icons/fa";
import { Client } from "../entities/Client";
import "../styles/HomePage.css";
import Modal from "../components/Modal";
import { MessageType } from "../utils/types";
import { ClientSchema, ClientValues } from "../schemas/clientSchema";
import { Formik } from "formik";
import Message from "../components/Message";
import Input from "../components/Input";
import ClientList from "../components/ClientList";
// import { data } from "../entities/data";

type ModalProps<T> = {
  show: boolean;
  entity?: T;
};

const HomePage: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [modal, setModal] = useState<ModalProps<Client>>({ show: false });
  const [message, setMessage] = React.useState<MessageType>({
    type: null,
    text: null,
  });
  const handleClose = () => setModal({ show: false });

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await clientService.getAll();
      const { clients } = await response.json();
      setClients(clients);
    };

    fetchData();
  }, []);

  const initialValues: ClientValues = {
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    address: "",
  };

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

  return (
    <Layout>
      <div className="home">
        <div className="container">
          <div className="header add-button">
            <h1>Clients</h1>
            <button
              className="primary"
              onClick={() =>
                setModal({
                  show: true,
                })
              }
            >
              <FaPlus />
              <span>Ajouter</span>
            </button>
          </div>
          <ClientList clients={clients} />
          {modal.show && (
            <Modal
              close={handleClose}
              title="Ajouter un client"
              entity={modal.entity}
              form={
                <Formik
                  initialValues={initialValues}
                  validateOnChange={false}
                  validateOnBlur={false}
                  validationSchema={ClientSchema}
                  onSubmit={async (values, { setErrors }) => {
                    // const response = await createClient(values);
                    // if (response.data?.createClient.errors) {
                    //   setErrors(toErrorMap(response.data.createClient.errors));
                    // }
                    // if (response.data?.createClient.error) {
                    //   setMessage({
                    //     color: "red",
                    //     text: getErrorMessage(response.data.createClient.error),
                    //   });
                    // }
                    // if (response.data?.createClient.message) {
                    //   setMessage({
                    //     color: "green",
                    //     text: getSuccessMessage(response.data.createClient.message),
                    //   });
                    // }
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
                        <button className="primary" type="submit">
                          Ajouter
                        </button>
                      </div>
                    </form>
                  )}
                </Formik>
              }
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
