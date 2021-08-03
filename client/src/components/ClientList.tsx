import React from "react";
import { Client } from "../entities/Client";
import "../styles/ClientList.css";
import { HiDotsVertical } from "react-icons/hi";
import { FaPhoneAlt } from "react-icons/fa";
import ActionsMenu, { ActionsMenuProps } from "./ActionsMenu";
import { Link, useHistory } from "react-router-dom";

type ClientsProps = {
  clients: Client[];
};

const ClientList: React.FC<ClientsProps> = ({ clients }) => {
  const [actionsMenu, setActionsMenu] = React.useState<ActionsMenuProps>({});

  const history = useHistory();

  const closeActionsMenu = () => setActionsMenu({});

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    clientId: number
  ) => {
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
      clientId,
    });
  };

  return (
    <div className="clients">
      {clients.map((client) => (
        <div
          onClick={() => history.push(`/client/${client.id}`)}
          className="clients-item"
          key={`client${client.id}`}
        >
          <span className="name">
            {client.firstname} {client.lastname}
          </span>
          <button className="circle phone">
            <FaPhoneAlt size="14" />
          </button>
          <button
            className="circle pure"
            onClick={(e) => handleClick(e, client.id)}
          >
            <HiDotsVertical size="18" />
          </button>
        </div>
      ))}
      {actionsMenu.clientId && (
        <ActionsMenu handleClose={closeActionsMenu} {...actionsMenu} />
      )}
    </div>
  );
};

export default ClientList;
