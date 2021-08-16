import { Card } from "../entities/Card";
import moment from "moment";
import "../styles/CardList.css";
import { HiDotsVertical } from "react-icons/hi";
import ActionsMenu, {
  ActionsMenuValues,
  DEFAULT_ACTIONS_MENU_VALUES,
} from "./ActionsMenu";
import { useState } from "react";

type CardListProps = {
  cards: Card[];
  editEvent: (cardId: number | undefined) => void;
  deleteEvent: (cardId: number | undefined) => void;
};

const CardList = ({ cards, editEvent, deleteEvent }: CardListProps) => {
  const [actionsMenu, setActionsMenu] = useState<ActionsMenuValues>(
    DEFAULT_ACTIONS_MENU_VALUES
  );

  const closeActionsMenu = () => setActionsMenu(DEFAULT_ACTIONS_MENU_VALUES);

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    cardId: number
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
      id: cardId,
    });
  };

  return (
    <div className="cards">
      {cards.map((card, i) => {
        const creationDate = moment(
          card.creationDate.replace("Z", ""),
          moment.ISO_8601
        );
        return (
          <div key={"card" + card.id} className="cards-item">
            <span>{i + 1}</span>
            <span>{creationDate.format("DD/MM/YY")}</span>
            <span>{creationDate.format("kk:mm")}</span>
            <button
              className="circle pure"
              onClick={(e) => handleClick(e, card.id)}
            >
              <HiDotsVertical size="18" />
            </button>
          </div>
        );
      })}
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

export default CardList;
