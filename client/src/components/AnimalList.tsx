import React from "react";
import { useHistory } from "react-router-dom";
import { Animal } from "../entities/Animal";
import "../styles/AnimalList.css";
import { HiDotsVertical } from "react-icons/hi";
import { client } from "../data";
import ActionsMenu, { ActionsMenuProps } from "./ActionsMenu";
import { getAnimalImageSrc } from "../utils/animals";

type AnimalProps = {
  animals?: Animal[];
};

const AnimalList = ({ animals }: AnimalProps) => {
  const [actionsMenu, setActionsMenu] = React.useState<ActionsMenuProps>({});

  let animalss = client.client.animals;

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
    <div className="animals">
      {animalss?.map((animal) => (
        <div
          onClick={() => history.push(`/animal/${animal.id}`)}
          key={`client${animal.id}`}
          className="animals-item"
        >
          <div className="top">
            <img src={getAnimalImageSrc(animal)} alt="dog" />
            <div className="header-info">
              <span className="name">{animal.name}</span>
              <span className="breed">{animal.breed}</span>
            </div>
            <button
              className="circle pure"
              onClick={(e) => handleClick(e, animal.id)}
            >
              <HiDotsVertical size="20" />
            </button>
          </div>
          <div>
            <span className="updated">Modifié il y'a 2 jours</span>
          </div>
        </div>
      ))}
      {actionsMenu.clientId && (
        <ActionsMenu handleClose={closeActionsMenu} {...actionsMenu} />
      )}
    </div>
  );
};

export default AnimalList;
