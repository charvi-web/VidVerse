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

  async (error) => {
    const originalRequest = error.config;
    const isRefreshRequest = originalRequest?.url?.includes("/users/refresh-token");

    if (error.response?.status === 401 && !originalRequest?._retry && !isRefreshRequest) {
      originalRequest._retry = true;

      try {
        const { data } = await axios.post(
          `${API.defaults.baseURL}/users/refresh-token`,
          {},
          { withCredentials: true }
        );
        const accessToken = data?.data?.accessToken;

        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return API(originalRequest);
        }
      } catch {
        // The final handler below clears an expired session.
      }
    }

    if (error.response?.status === 401) localStorage.removeItem("accessToken");

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
