import API from "./Axios"


// Get booked slots for a therapist (optionally filter by date range)
export const getBookedSlots = (therapistId, params = {}) =>
  API.get(`/appointments/therapist/${therapistId}/booked-slots`, { params });

// Create a new appointment (patient only)
export const createAppointment = (data) =>
  API.post("/appointments/", data);

// Edit an appointment (patient only)
export const editAppointment = (appointmentId, data) =>
  API.put(`/appointments/${appointmentId}`, data);

// Cancel an appointment (patient only)
export const cancelAppointment = (appointmentId) =>
  API.patch(`/appointments/${appointmentId}/cancel`);

// Get all appointments assigned to logged-in therapist
export const getAssignedAppointments = (params = {}) =>
  API.get("/appointments/assigned", { params });

// Update appointment status (therapist only)
export const updateAppointmentStatus = (appointmentId, status) =>
  API.patch(`/appointments/${appointmentId}/status`, { status });

// Get all of my appointments (patient)
export const getMyAppointments = (params = {}) =>
  API.get("/appointments/mine", { params });

// Get ALL appointments in the system (therapist only, admin-like view)
export const getAllAppointments = (params = {}) =>
  API.get("/appointments/all", { params });