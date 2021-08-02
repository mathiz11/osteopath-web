import React from "react";
import { Link } from "react-router-dom";
import "../styles/ActionsMenu.css";

export type ActionsMenuProps = {
  x?: number;
  y?: number;
  clientId?: number;
  handleClose?: () => void;
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

const ActionsMenu = ({ x, y, clientId, handleClose }: ActionsMenuProps) => {
  const ref = React.useRef<HTMLDivElement>(null);

  useOutsideAlerter(ref, handleClose);

  let style: React.CSSProperties = React.useMemo(
    () => ({
      left: `${x}px`,
      top: `${y}px`,
    }),
    [x, y]
  );

  return (
    <div ref={ref} style={style} className="actions-menu">
      <Link to="/client/edit">Modifier</Link>
      <button>Supprimer</button>
    </div>
  );
};

export default ActionsMenu;
