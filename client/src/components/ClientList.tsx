import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import { Client } from "../entities/Client";
import "../styles/ClientList.css";
import ActionsMenu, {
  ActionsMenuValues,
  DEFAULT_ACTIONS_MENU_VALUES,
} from "./ActionsMenu";

type ClientsProps = {
  clients: Client[];
  editEvent: (clientId: number | undefined) => void;
  deleteEvent: (clientId: number | undefined) => void;
};

const ClientList: React.FC<ClientsProps> = ({
  clients,
  editEvent,
  deleteEvent,
}) => {
  const [actionsMenu, setActionsMenu] = React.useState<ActionsMenuValues>(
    DEFAULT_ACTIONS_MENU_VALUES
  );

  const history = useHistory();

  const closeActionsMenu = () => setActionsMenu(DEFAULT_ACTIONS_MENU_VALUES);

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
      <ActionsMenu
        isVisible={actionsMenu.clientId !== undefined}
        close={closeActionsMenu}
        editEvent={editEvent}
        deleteEvent={deleteEvent}
        values={actionsMenu}
      />
    </div>
  );
};

export default ClientList;
