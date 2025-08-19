import API from "./Axios";

export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const logoutUser = () => API.post("/auth/logout");


// Get logged-in user's profile
export const getProfile = () => API.get("/users/me");

// Get user by ID (therapist/admin)
export const getUserById = (userId) => API.get(`/users/${userId}`);

// Update user info
export const updateUser = (userId, userData) => API.put(`/users/${userId}`, userData);

// Change password
export const changePassword = (userId, oldPassword, newPassword) =>
  API.patch(`/users/${userId}/password`, { old_password: oldPassword, new_password: newPassword });

// Delete user
export const deleteUser = (userId) => API.delete(`/users/${userId}`);
