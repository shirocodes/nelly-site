import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { loginUser, getProfile } from "../../apis/Auth"
import { FaArrowLeft } from "react-icons/fa";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await loginUser(formData);
      const token = res.data.access_token;
      localStorage.setItem("token", token);

      // fetch profile after login
      const profileRes = await getProfile();
      login(profileRes.data, token);

      navigate("/account");
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ background: "linear-gradient(135deg, #f0fdf4, #e0f7fa)" }}
    >
      <div
        className="card shadow-lg p-4 p-md-5 rounded-5 border-0"
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "linear-gradient(145deg,rgb(244, 227, 243), rgb(83, 116, 85))",
          boxShadow: "0 0 20px rgba(0, 150, 136, 0.4), 0 0 40px rgba(0, 150, 136, 0.2)",
        }}
      >
        {/* Back button */}
        <button
          className="btn btn-link position-absolute"
          style={{ top: "8px", left: "8px", color: "#3a6ea5" }}
          onClick={() => navigate("/services")}
        >
          <FaArrowLeft size={15} />
        </button>
        <h2
          className="mb-4 text-center fw-bold"
          style={{ fontFamily: "'Nunito', sans-serif", color: "#00796b" }}
        >
          Login
        </h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              name="email"
              className="form-control rounded-3"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              name="password"
              className="form-control rounded-3"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="btn w-100 rounded-3 fw-semibold"
            style={{
              backgroundColor: "#00796b",
              border: "none",
              color: "#fff",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#00695c")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#00796b")}
          >
            Login
          </button>

          <p className="text-center mt-3 mb-0" style={{ color: "#004d40" }}>
            Don't have an account? <a href="/signup" style={{ color: "#00796b", fontWeight: "600" }}>Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
