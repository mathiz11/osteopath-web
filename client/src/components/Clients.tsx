import React from "react";
import { Client } from "../entities/Client";
import "../styles/Clients.css";
import { HiDotsVertical } from "react-icons/hi";
import { FaPhoneAlt } from "react-icons/fa";
import ActionsMenu, { ActionsMenuProps } from "./ActionsMenu";

type ClientsProps = {
  clients: Client[];
};

const Clients: React.FC<ClientsProps> = ({ clients }) => {
  const [actionsMenu, setActionsMenu] = React.useState<ActionsMenuProps>({});

  const closeActionsMenu = () => setActionsMenu({});

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    clientId: number
  ) => {
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
      {clients.map((client, i) => (
        <div className="client" key={`client${i}`}>
          <span className="name">
            {client.firstname} {client.lastname}
          </span>
          <button className="phone">
            <FaPhoneAlt size="14" />
          </button>
          <button className="edit" onClick={(e) => handleClick(e, client.id)}>
            <HiDotsVertical size="20" />
          </button>
        </div>
      ))}
      {actionsMenu.clientId && (
        <ActionsMenu handleClose={closeActionsMenu} {...actionsMenu} />
      )}
    </div>
  );
};

export default Clients;
