import React from "react";

type StateType = {
  isAuth: boolean;
};

export enum ACTION {
  LOG_IN = "login",
  LOG_OUT = "logout",
}

type ActionType = {
  type: ACTION.LOG_IN | ACTION.LOG_OUT;
};

const initialValues: StateType = {
  isAuth: false,
};

export const Context = React.createContext<[StateType, React.Dispatch<any>]>([
  initialValues,
  () => {},
]);

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case ACTION.LOG_IN:
      return {
        isAuth: true,
      };
    case ACTION.LOG_OUT:
      return {
        isAuth: false,
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
