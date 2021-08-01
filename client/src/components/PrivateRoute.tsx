import React from "react";
import { Redirect, Route } from "react-router";

const PrivateRoute = ({ component, isAuth, ...rest }: any) => (
  <Route
    {...rest}
    render={(props) =>
      isAuth ? (
        React.createElement(component, props)
      ) : (
        <Redirect to={{ pathname: "/login" }} />
      )
    }
  />
);

export default PrivateRoute;
