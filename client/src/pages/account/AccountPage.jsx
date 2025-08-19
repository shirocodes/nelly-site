import React from "react";
import { Link } from "react-router-dom";

const AccountPage = () => {
  return (
    <div className="container mt-4">
      <h2 className="mb-3">My Account</h2>
      <div className="list-group">
        <Link to="/account/profile" className="list-group-item list-group-item-action">
          Manage Profile
        </Link>
        <Link to="/account/appointments" className="list-group-item list-group-item-action">
          My Appointments
        </Link>
      </div>
    </div>
  );
};

export default AccountPage;
