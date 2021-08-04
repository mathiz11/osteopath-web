import "../styles/Message.css";
import { ActionType, useStore } from "./Store";
import { useEffect } from "react";

export enum MessageType {
  ERROR = "error",
  WARNING = "warning",
  SUCCESS = "success",
}

export type MessageValues = {
  type: MessageType;
  text: string;
};

const Message = () => {
  const [state, dispatch] = useStore();

  useEffect(() => {
    if (state.message) {
      setTimeout(() => {
        dispatch({ type: ActionType.REMOVE_MESSAGE });
      }, 5000);
    }
  }, [state.message, dispatch]);

  return state.message ? (
    <div className={`message ${state.message.type}`}>{state.message.text}</div>
  ) : null;
};

export default Message;
