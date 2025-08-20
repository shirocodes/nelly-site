import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import abaImg from "../../assets/aba-img.png";
import { AuthContext } from "../../context/AuthContext";

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  // Close navbar after clicking a link (for mobile)
  const closeNavbar = () => {
    const navbar = document.getElementById("navbarNav");
    if (navbar && navbar.classList.contains("show")) {
      navbar.classList.remove("show");
    }
  };

  return (
    <>
      <header
        className="bg-light border-bottom"
        style={{ position: "sticky", top: 0, zIndex: 1030 }}
      >
        <nav className="navbar navbar-expand-lg py-0 child-nav">
          <Link className="navbar-brand p-2" to="/" onClick={closeNavbar}>
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
                <Link className="nav-link" to="/" onClick={closeNavbar}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/services" onClick={closeNavbar}>
                  Services
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/book" onClick={closeNavbar}>
                  Book Now
                </Link>
              </li>
              {!user ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login" onClick={closeNavbar}>
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup" onClick={closeNavbar}>
                      Signup
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/account"
                      onClick={closeNavbar}
                    >
                      My Account
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link btn btn-link"
                      style={{ textDecoration: "none" }}
                      onClick={() => {
                        handleLogout();
                        closeNavbar();
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default NavBar;
