import React from "react";
import { Container } from "semantic-ui-react";
import Navbar from "./Navbar";

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container>{children}</Container>
      <footer>All rights</footer>
    </>
  );
};

export default Layout;
