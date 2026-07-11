import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1",

  withCredentials: true,

  timeout: 30000,

  headers: {
    "Content-Type": "application/json",
  },
});

// =========================
// Request Interceptor
// =========================
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

// =========================
// Response Interceptor
// =========================
API.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
    }

    // Don't log cancelled requests
    if (!axios.isCancel(error)) {
      console.error(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong"
      );
    }

    return Promise.reject(error);
  }
);

export default API;