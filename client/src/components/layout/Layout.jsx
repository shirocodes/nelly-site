import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <main className="container my-5">{children}</main>
      <Footer/>
    </>
  );
};

export default Layout;
