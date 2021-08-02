import { FC } from "react";
import "../styles/Message.css";

type MessageProps = {
  type: "error" | "warning" | "success";
};

const Message: FC<MessageProps> = ({ type, children }) => {
  return <div className={`message ${type}`}>{children}</div>;
};

export default Message;
