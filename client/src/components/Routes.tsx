import { BrowserRouter, Route, Switch } from "react-router-dom";
import ClientPage from "../pages/ClientPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import PrivateRoute from "./PrivateRoute";
import { useStore } from "./Store";

const Routes = () => {
  const [state] = useStore();

  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute
          path="/"
          exact
          component={HomePage}
          isAuth={state.isAuth}
        />
        <Route path="/login" component={LoginPage} />
        <PrivateRoute path="/client/:clientId" component={ClientPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
