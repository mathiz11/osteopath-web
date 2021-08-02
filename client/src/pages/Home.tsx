import React, { useState } from "react";
import Clients from "../components/Clients";
import Layout from "../components/Layout";
import clientService from "../services/clientService";
import { FaPlus } from "react-icons/fa";
import { Client } from "../entities/Client";
import "../styles/Home.css";
// import { data } from "../entities/data";

const Home: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await clientService.getAll();
      const { clients } = await response.json();
      setClients(clients);
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <div className="home">
        <div className="header">
          <h1>Clients</h1>
          <button className="primary add-client">
            <FaPlus />
            <span>Ajouter</span>
          </button>
        </div>
        <Clients clients={clients} />
      </div>
    </Layout>
  );
};

export default Home;
