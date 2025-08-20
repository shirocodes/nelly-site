import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getProfile, updateUser } from "../../apis/Auth"
import { FaArrowLeft } from "react-icons/fa"

const Profile = () => {
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const navigate = useNavigate();

  useEffect(() => {
    getProfile().then((res) => setForm(res.data));
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUser(form);
    alert("Profile updated!");
  };

  return (
    <div 
      className="min-vh-100 d-flex justify-content-center align-items-center bg-light"
      style={{ background: "linear-gradient(135deg, #f0fdf4, #e0f7fa)" }}
    >
      <div
        className="card shadow-lg p-4 position-relative"
        style={{
          maxWidth: "700px",
          width: "100%",
          borderRadius: "1.5rem",
          background: "linear-gradient(145deg,rgb(244, 227, 243), rgb(83, 116, 85))",
          boxShadow: "0 0 20px rgba(0, 150, 136, 0.4), 0 0 40px rgba(0, 150, 136, 0.2)",

        }}
      >
        {/* Floating Back Arrow */}
        <button
          className="btn btn-link position-absolute"
          style={{ top: "12px", left: "12px", color: "#3a6ea5" }}
          onClick={() => navigate("/account")}
        >
          <FaArrowLeft size={20} />
        </button>

        <h2 className="mb-4 text-center" style={{ color: "#3a6ea5" }}>
          My Profile
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="text"
              name="phone"
              className="form-control"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter your phone"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email (read-only)</label>
            <input
              type="email"
              className="form-control"
              value={form.email}
              disabled
            />
          </div>

          <button
            type="submit"
            className="btn w-100"
            style={{
              backgroundColor: "#3a6ea5",
              color: "white",
              borderRadius: "8px",
            }}
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
