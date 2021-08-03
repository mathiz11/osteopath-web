import React from "react";
import clientService from "../services/clientService";
import { Client } from "../entities/Client";
import Layout from "../components/Layout";
import { FaPlus } from "react-icons/fa";
import "../styles/ClientPage.css";
import AnimalList from "../components/AnimalList";

const ClientPage = ({ match }: any) => {
  const [client, setClient] = React.useState<Client | undefined>();

  React.useEffect(() => {
    (async () => {
      if (match.params.clientId) {
        const response = await clientService.getOne(match.params.clientId);
        const jsonResponse = await response.json();
        setClient(jsonResponse.client);
      }
    })();
  }, [match.params.clientId]);

  return (
    <Layout>
      <div className="client">
        {client && (
          <>
            <div className="header add-button">
              <h1>
                {client.firstname} {client.lastname}
              </h1>
              <button className="primary" onClick={() => {}}>
                <FaPlus />
                <span>Ajouter</span>
              </button>
            </div>
            <h2>Animaux</h2>
            <AnimalList animals={client.animals} />
          </>
        )}
      </div>
    </Layout>
  );
};

export default ClientPage;
