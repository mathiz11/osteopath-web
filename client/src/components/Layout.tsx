import React from "react";
import Navbar from "./Navbar";

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="main">{children}</div>
      <footer></footer>
    </>
  );
};

export default Layout;
