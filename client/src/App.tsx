import { Store } from "./components/Store";
import Routes from "./components/Routes";

import "./App.css";
import "semantic-ui-css/semantic.min.css";

const App = () => (
  <Store>
    <Routes />
  </Store>
);

export default App;
