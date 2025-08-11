import axios from "axios";

const api = axios.create({
  // baseURL: process.env.REACT_APP_API || 'http://localhost:8000', // fallback for local dev
  // baseURL: "http://127.0.0.1:5000",
  baseURL: "https://wb-image.onrender.com",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
