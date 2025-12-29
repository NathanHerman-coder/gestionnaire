import axios from "axios";

// Use environment variable when available (Vite uses import.meta.env)
const BASE_URL = import.meta.env.VITE_API_BASE || "https://backend-8gia.onrender.com";

const api = axios.create({
  baseURL: BASE_URL,
});

// Attach access token to each request if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to try refreshing token on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If unauthorized and we haven't retried yet, try refresh
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refresh = localStorage.getItem("refresh");

      if (!refresh) {
        // No refresh token -> force logout by redirecting to login
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        const resp = await axios.post(`${BASE_URL}token/refresh/`, {
          refresh,
        });

        const newAccess = resp.data.access;
        localStorage.setItem("access", newAccess);

        // update header and retry original request
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed: clear storage and go to login
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
