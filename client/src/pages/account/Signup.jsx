import React, { useState, useContext} from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../apis/Auth"
import { FaArrowLeft } from "react-icons/fa"

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext)
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // backend should return { user, token } on signup
      const res = await registerUser(formData);

      // save user + token in context
      login(res.data.user, res.data.token);
      navigate("/account")
      
    } catch (err) {
      setError(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center"
      style={{ background: "linear-gradient(135deg, #f0fdf4, #e0f7fa)" }}
    >
      <div 
        className="card shadow-lg p-4 p-md-5 rounded-5 border-0"
        style={{
          width: "100%",
          maxWidth: "500px",
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
        <h2 className="mb-4 text-center">Sign Up</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form className="mx-auto" style={{ maxWidth: "500px" }} onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
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
          >
            Sign Up
          </button>
          <p className="text-center mt-3 mb-0" style={{ color: "#004d40" }}>
            Already have an account? <a href="/login" style={{ color: "#00796b", fontWeight: "600" }}>Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
