import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const AccountPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light" 
      style={{ background: "linear-gradient(135deg, #f0fdf4, #e0f7fa)" }}>
      <div
        className=" card shadow-lg p-4 position-relative"
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "linear-gradient(145deg,rgb(244, 227, 243), rgb(83, 116, 85))",
          boxShadow: "0 0 20px rgba(0, 150, 136, 0.4), 0 0 40px rgba(0, 150, 136, 0.2)",
        }}
      >
        {/* Floating Back Arrow */}
        <button
          className="btn btn-link position-absolute"
          style={{ top: "12px", left: "12px", color: "#3a6ea5" }}
          onClick={() => navigate("/services")}
        >
          <FaArrowLeft size={20} />
        </button>

        <h2 className="text-center mb-4" style={{ color: "#3a6ea5" }}>
          My Account
        </h2>

        <div className="list-group">
          <Link
            to="/account/appointments"
            className="list-group-item list-group-item-action"
            style={{
              borderRadius: "8px",
              textAlign: "center",
              fontWeight: "500",
              color: "#3a6ea5",
            }}
          >
            My Appointments
          </Link>
          <Link
            to="/account/profile"
            className="list-group-item list-group-item-action"
            style={{
              borderRadius: "8px",
              marginBottom: "12px",
              textAlign: "center",
              fontWeight: "500",
              color: "#3a6ea5",
            }}
          >
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
