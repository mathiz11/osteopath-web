import React from "react";
import { MessageValues } from "./Message";

type State = {
  isAuth: boolean;
  message?: MessageValues;
};

export enum ActionType {
  LOG_IN = "login",
  LOG_OUT = "logout",
  SET_MESSAGE = "set_message",
  REMOVE_MESSAGE = "remove_message",
}

export type Action = {
  type:
    | ActionType.LOG_IN
    | ActionType.LOG_OUT
    | ActionType.SET_MESSAGE
    | ActionType.REMOVE_MESSAGE;
  payload: MessageValues;
};

const initialValues: State = {
  isAuth: false,
};

export const Context = React.createContext<[State, React.Dispatch<any>]>([
  initialValues,
  () => {},
]);

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.LOG_IN:
      return {
        ...state,
        isAuth: true,
      };
    case ActionType.LOG_OUT:
      return {
        ...state,
        isAuth: false,
      };
    case ActionType.SET_MESSAGE:
      return {
        ...state,
        message: action.payload,
      };
    case ActionType.REMOVE_MESSAGE:
      return {
        isAuth: state.isAuth,
      };
    default:
      return state;
  }
};

export const Store: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialValues);

  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const useStore = () => React.useContext(Context);
