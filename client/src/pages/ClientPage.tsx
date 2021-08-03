import React from "react";
import clientService from "../services/clientService";
import { Client } from "../entities/Client";
import Layout from "../components/Layout";
import { FaPlus } from "react-icons/fa";
import { BsFillEnvelopeFill, BsGeo, BsPhone } from "react-icons/bs";
import { HiDotsVertical } from "react-icons/hi";
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
                  <button className="circle pure">
                    <HiDotsVertical size="18" />
                  </button>
                </div>
              </div>

              <div className="header add-button">
                <h2>Animaux</h2>
                <button className="primary" onClick={() => {}}>
                  <FaPlus />
                  <span>Ajouter</span>
                </button>
              </div>
              <AnimalList animals={client.animals} />
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ClientPage;
