import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// -----------------------------
// Request Interceptor
// -----------------------------
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// -----------------------------
// Response Interceptor
// -----------------------------
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error(
      "API Error:",
      error.response?.data?.message || error.message
    );

    return Promise.reject(error);
  }
);

export default API;