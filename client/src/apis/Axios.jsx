import axios from 'axios'

// Base API URL 
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { "Content-Type": "application/json" }
});

// Attach JWT token if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // you save token after login/register
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
