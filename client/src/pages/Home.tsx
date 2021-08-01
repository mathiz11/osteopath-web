import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Header, List } from "semantic-ui-react";
import Layout from "../components/Layout";
import clientService from "../services/clientService";

const Home: React.FC = () => {
  const [clients, setClients] = useState<Array<any>>([]);

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
      <div className="title-container">
        <Header as="h1">Clients</Header>
        <Link to="/client/new">
          <Button icon="plus" circular></Button>
        </Link>
      </div>
      <List selection divided relaxed>
        {clients?.map((client, i) => (
          <Link key={`client-${i}`} to="/client/[id]">
            <List.Item>
              <List.Content>
                <List.Header>
                  {client.firstname} {client.lastname}
                </List.Header>
              </List.Content>
            </List.Item>
          </Link>
        ))}
      </List>
    </Layout>
  );
};

export default Home;
