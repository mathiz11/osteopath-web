import { BrowserRouter, Route, Switch } from "react-router-dom";
import AnimalPage from "../pages/AnimalPage";
import CardEditPage from "../pages/CardEditPage";
import ClientPage from "../pages/ClientPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
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
        <Route path="/login" exact component={LoginPage} />
        <PrivateRoute
          path="/client/:clientId"
          exact
          component={ClientPage}
          isAuth={state.isAuth}
        />
        <PrivateRoute
          path="/profile"
          exact
          component={ProfilePage}
          isAuth={state.isAuth}
        />
        <PrivateRoute
          path="/client/:clientId/animal/:animalId"
          exact
          component={AnimalPage}
          isAuth={state.isAuth}
        />
        <PrivateRoute
          path="/client/:clientId/animal/:animalId/card/new"
          component={CardEditPage}
          isAuth={state.isAuth}
        />
        <PrivateRoute
          path="/client/:clientId/animal/:animalId/card/:cardId/edit"
          component={CardEditPage}
          isAuth={state.isAuth}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
