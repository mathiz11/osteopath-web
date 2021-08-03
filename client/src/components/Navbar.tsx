import React from "react";
import { Link } from "react-router-dom";
import { ACTION, useStore } from "./Store";
import logo from "../images/care.png";
import "../styles/Navbar.css";
import authService from "../services/authService";

const Navbar: React.FC = () => {
  const [state, dispatch] = useStore();

  const path = React.useMemo(
    () => window.location.pathname,
    [window.location.pathname]
  );

  const logout = async () => {
    const response = await authService.logout();
    if (response.ok) {
      dispatch({ type: ACTION.LOG_OUT });
    }
  };

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
            <button
              onClick={logout}
              className={path === "/logout" ? "active" : undefined}
            >
              Déconnexion
            </button>
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
