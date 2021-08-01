import React from "react";
import { Link } from "react-router-dom";
import { Icon, Menu } from "semantic-ui-react";

const Navbar: React.FC = () => {
  const connected = React.useMemo(() => true, []);

  const path = window.location.pathname;

  return (
    <header>
      <Menu pointing secondary>
        <Menu.Item active={path === "/"}>
          <Link to="/">
            <Icon name="home" />
            <span>Accueil</span>
          </Link>
        </Menu.Item>
        <Menu.Menu position="right">
          {connected ? (
            <>
              <Menu.Item active={path === "/profile"}>
                <Link to="/profile">
                  <Icon name="user" />
                  <span>Mon profil</span>
                </Link>
              </Menu.Item>
              <Menu.Item color="red" name="logout">
                <Icon name="sign-out" />
                Se déconnecter
              </Menu.Item>
            </>
          ) : (
            <Menu.Item active={path === "/login"}>
              <Link to="/login">
                <Icon name="sign in" />
                <span>Connexion</span>
              </Link>
            </Menu.Item>
          )}
        </Menu.Menu>
      </Menu>
    </header>
  );
};

export default Navbar;
