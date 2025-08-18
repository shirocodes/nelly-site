import React from "react";
import { Link } from "react-router-dom";
import abaImg from "../../assets/aba-img.png";

const NavBar = () => {
  return (
    <>
      <header
        className="bg-light border-bottom"
        style={{ position: "sticky", top: 0, zIndex: 1030 }}
      >
        <nav className="navbar navbar-expand-lg py-0 child-nav">
          <Link className="navbar-brand p-2" to="/">
            <img
              src={abaImg}
              alt="Little Puzzles ABA Therapy"
              style={{ height: "70px", objectFit: "cover" }}
            />
          </Link>
          <button
            className="navbar-toggler me-2"
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
                <Link className="nav-link ms-2 mt-1 btn-book" to="/book">
                  Book Now
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default NavBar;
