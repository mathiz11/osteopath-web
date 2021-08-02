import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "./Store";
import logo from "../images/care.png";
import "../styles/Navbar.css";

const Navbar: React.FC = () => {
  const [state] = useStore();

  const path = window.location.pathname;

  return (
    <header>
      <Link to="/">
        <img src={logo} alt="site logo" width="64" height="64" />
      </Link>
      <div className="actions">
        {state.isAuth ? (
          <>
            <Link
              to="/profile"
              className={path === "/profile" ? "active" : undefined}
            >
              Profil
            </Link>
            <Link
              to="/logout"
              className={path === "/logout" ? "active" : undefined}
            >
              Déconnexion
            </Link>
          </>
        ) : (
          <Link
            to="/login"
            className={path === "/login" ? "active" : undefined}
          >
            Connexion
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
