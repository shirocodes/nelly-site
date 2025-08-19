import React, { useState, useEffect } from "react";
import { getProfile, updateUser } from "../../apis/Auth";

const Profile = () => {
  const [form, setForm] = useState({ name: "", phone: "", email: "" });

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
    <div className="container mt-4">
      <h3>Profile</h3>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            className="form-control"
            value={form.phone}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Email (read-only)</label>
          <input
            type="email"
            className="form-control"
            value={form.email}
            disabled
          />
        </div>
        <button className="btn btn-primary">Save Changes</button>
      </form>
    </div>
  );
};

export default Profile;
