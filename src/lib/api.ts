import axios from "axios";

export const api = axios.create({
  baseURL: "/api",
  withCredentials: true, // Pour cookies
});

// ======================================================
// RESPONSE INTERCEPTOR (Refresh automatique)
// ======================================================
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Ignore auth routes
    if (
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/verify-2fa") ||
      originalRequest.url?.includes("/auth/google-login") ||
      originalRequest.url?.includes("/auth/refresh")
    ) {
      return Promise.reject(error);
    }

    // Si 401 → essayer refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Refresh via cookie HttpOnly
        await api.post("/auth/refresh");

        // Retry la requête originale
        return api(originalRequest);
      } catch {
        // Si refresh échoue → redirection login
        window.location.href = "/auth/login";
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);