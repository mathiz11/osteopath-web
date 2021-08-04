import React from "react";
import "../styles/ActionsMenu.css";

export type ActionsMenuValues = {
  x: number | undefined;
  y: number | undefined;
  clientId: number | undefined;
};

export const DEFAULT_ACTIONS_MENU_VALUES: ActionsMenuValues = {
  x: undefined,
  y: undefined,
  clientId: undefined,
};

type ActionsMenuProps = {
  values: ActionsMenuValues;
  close: () => void;
  editEvent: (id: number | undefined) => void;
};

export const useOutsideAlerter = (
  ref: React.RefObject<HTMLDivElement>,
  closeModal: (() => void) | undefined
) => {
  React.useEffect(() => {
    function handleClickOutside(this: Document, event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        if (closeModal) {
          closeModal();
        }
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, closeModal]);
};

const ActionsMenu = ({ values, editEvent, close }: ActionsMenuProps) => {
  const { x, y, clientId } = values;
  const ref = React.useRef<HTMLDivElement>(null);
  useOutsideAlerter(ref, close);

  let style: React.CSSProperties = React.useMemo(
    () => ({
      left: `${x}px`,
      top: `${y}px`,
    }),
    [x, y]
  );

  return (
    <div ref={ref} style={style} className="actions-menu">
      <button onClick={() => editEvent(clientId)}>Modifier</button>
      <button>Supprimer</button>
    </div>
  );
};

export default ActionsMenu;
