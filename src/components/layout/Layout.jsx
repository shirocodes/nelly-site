import React from "react";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <>
      <header 
        className="bg-light border-bottom"
        style={{position: 'sticky', top: 0, zIndex: 1030}}
      >
        <nav className="navbar navbar-expand-lg child-nav">
          <Link className="navbar-brand p-2" to="/">
            LOGO
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto p-2">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/services">
                  Services
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link btn-book" to="/book">
                  Book Now
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <main className="container my-5">{children}</main>

      <footer className="bg-light text-center py-4 mt-auto">
        <p className="mb-0">© 2025 Behavior Analyst</p>
      </footer>
    </>
  );
};

export default Layout;
