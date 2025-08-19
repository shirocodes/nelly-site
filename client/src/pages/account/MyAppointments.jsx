import React, { useEffect, useState } from "react";
import { getMyAppointments, cancelAppointment } from "../../apis/Appointments";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    getMyAppointments().then((res) => setAppointments(res.data));
  }, []);

  const handleCancel = async (id) => {
    await cancelAppointment(id);
    setAppointments(appointments.filter((appt) => appt.id !== id));
  };

  return (
    <div className="container mt-4">
      <h3>My Appointments</h3>
      <ul className="list-group mt-3">
        {appointments.map((appt) => (
          <li key={appt.id} className="list-group-item d-flex justify-content-between">
            <div>
              <strong>{appt.reason}</strong> <br />
              {new Date(appt.start_time).toLocaleString()} -{" "}
              {new Date(appt.end_time).toLocaleString()}
            </div>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => handleCancel(appt.id)}
            >
              Cancel
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyAppointments;
