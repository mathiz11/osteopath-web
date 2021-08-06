import React from "react";
import { HiDotsVertical } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import { Animal } from "../entities/Animal";
import "../styles/AnimalList.css";
import { getAnimalImageSrc } from "../utils/animals";
import ActionsMenu, {
  ActionsMenuValues,
  DEFAULT_ACTIONS_MENU_VALUES,
} from "./ActionsMenu";

type AnimalProps = {
  animals?: Animal[];
  editEvent: (animalId: number | undefined) => void;
  deleteEvent: (animalId: number | undefined) => void;
  clientId: number;
};

const AnimalList = ({
  animals,
  editEvent,
  deleteEvent,
  clientId,
}: AnimalProps) => {
  const [actionsMenu, setActionsMenu] = React.useState<ActionsMenuValues>(
    DEFAULT_ACTIONS_MENU_VALUES
  );

  const history = useHistory();

  const closeActionsMenu = () => setActionsMenu(DEFAULT_ACTIONS_MENU_VALUES);

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    animalId: number
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
      id: animalId,
    });
  };

  return (
    <div className="animals">
      {animals?.map((animal) => (
        <div
          onClick={() =>
            history.push(`/client/${clientId}/animal/${animal.id}`)
          }
          key={`client${animal.id}`}
          className="animals-item"
        >
          <div className="top">
            <img src={getAnimalImageSrc(animal)} alt={animal.type} />
            <div className="header-info">
              <span className="name">{animal.name}</span>
              <span className="breed">{animal.breed}</span>
            </div>
            <button
              className="circle pure"
              onClick={(e) => handleClick(e, animal.id)}
            >
              <HiDotsVertical size="18" />
            </button>
          </div>
          <div>
            <span className="updated">Modifié il y'a 2 jours</span>
          </div>
        </div>
      ))}
      <ActionsMenu
        isVisible={actionsMenu.id !== undefined}
        close={closeActionsMenu}
        editEvent={editEvent}
        deleteEvent={deleteEvent}
        values={actionsMenu}
      />
    </div>
  );
};

export default AnimalList;
