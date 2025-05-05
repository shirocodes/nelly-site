import React from "react";
import NavBar from "./NavBar";

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <main className="container my-5">{children}</main>

      <footer 
        className="bg-light text-center py-2 mt-auto"
        // style={{position: 'sticky', bottom: 0, zIndex: 1030}}
      >
        <p className="mb-0">© 2025 Behavior Analyst</p>
      </footer>
    </>
  );
};

export default Layout;
