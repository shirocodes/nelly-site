import React, { useEffect, useState } from "react";
import { getMyAppointments, cancelAppointment } from "../../apis/Appointments";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getMyAppointments().then((res) => setAppointments(res.data));
  }, []);

  const handleCancel = async (id) => {
    await cancelAppointment(id);
    setAppointments(appointments.filter((appt) => appt.id !== id));
  };

  return (
    <div 
      className="min-vh-100 d-flex justify-content-center align-items-center"
      style={{ background: "linear-gradient(135deg, #f0fdf4, #e0f7fa)" }}

    >
      <div
        className="card shadow-lg p-4 position-relative w-100"
        style={{
          maxWidth: "700px",
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

        <h3 className="text-center mb-4" style={{ color: "#3a6ea5" }}>
          My Appointments
        </h3>

        {appointments.length === 0 ? (
          <p className="text-center text-muted">No appointments yet.</p>
        ) : (
          <div className="list-group">
            {appointments.map((appt) => (
              <div
                key={appt.id}
                className="list-group-item d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-2"
                style={{
                  borderRadius: "12px",
                  border: "1px solid #e0ecff",
                  background: "#fff",
                  boxShadow: "0 2px 6px rgba(100,180,255,0.15)",
                }}
              >
                <div style={{ flex: 1 }}>
                  <strong style={{ color: "#3a6ea5" }}>{appt.reason}</strong>
                  <br />
                  <small className="text-muted">
                    {new Date(appt.start_time).toLocaleString()} –{" "}
                    {new Date(appt.end_time).toLocaleString()}
                  </small>
                </div>
                <button
                  className="btn btn-sm btn-outline-danger mt-2 mt-md-0 ms-md-3"
                  onClick={() => handleCancel(appt.id)}
                >
                  Cancel
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;
