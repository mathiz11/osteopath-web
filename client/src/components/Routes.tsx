import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
import { useStore } from "./Store";

const Routes = () => {
  const [state] = useStore();

  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute path="/" exact component={Home} isAuth={state.isAuth} />
        <Route path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
