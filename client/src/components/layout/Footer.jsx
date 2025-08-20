import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer 
      className="bg-light text-light pt-4 pb-2 mt-5"
      style={{
        background: "linear-gradient(180deg,rgba(107, 66, 107, 0.77),rgba(2, 60, 13, 0.61))", 
      }}
    >
      <div className="container">
        <div className="row text-center text-muted text-md-start">
          
          {/* Contact */}
          <div className="col-12 col-md-4">
            <h6 className="fw-bold mb-3">Get in Touch</h6>
            <p className="small mb-1">📧 info@behavioranalyst.co.ke</p>
            <p className="small mb-0">📞 +254 728 804 515</p>
          </div>

          {/* CTA */}
          <div className="col-12 col-md-4 d-flex flex-column align-items-center align-items-md-start">
            <h6 className="fw-bold mb-3">Take the Next Step</h6>
            <Link to="/book" className="btn btn-success btn-sm fw-bold px-4">
              Book Now
            </Link>
          </div>

          {/* Socials */}
          <div className="col-12 col-md-4">
            <h6 className="fw-bold mb-3">Follow Us</h6>
            <div className="d-flex justify-content-center justify-content-md-start gap-3">
              <a 
                href="https://facebook.com" target="_blank" rel="noreferrer" 
                className="text-light fs-5 d-flex align-items-center justify-content-center rounded-circle"
                style={{ width: "35px", height: "35px", backgroundColor: "#3b5998" }}
              >
                <FaFacebookF />
              </a>
              <a 
                href="https://instagram.com" target="_blank" rel="noreferrer" 
                className="text-light fs-5 d-flex align-items-center justify-content-center rounded-circle"
                style={{ width: "35px", height: "35px", background: "radial-gradient(circle at 30% 30%, #feda75, #d62976, #962fbf, #4f5bd5)" }}
              >
                <FaInstagram />
              </a>
              <a 
                href="https://linkedin.com" target="_blank" rel="noreferrer" 
                className="text-light fs-5 d-flex align-items-center justify-content-center rounded-circle"
                style={{ width: "35px", height: "35px", backgroundColor: "#0077b5" }}
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

        </div>

        <hr className="border-light my-3" />

        <p className="text-center small mb-0">
          © {new Date().getFullYear()} Little Puzzles | All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
