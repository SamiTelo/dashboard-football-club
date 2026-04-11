import axios from "axios";

export const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

// ======================================================
// REQUEST INTERCEPTOR
// ======================================================
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

// ======================================================
// RESPONSE INTERCEPTOR
// ======================================================
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // ignore auth routes + refresh itself
    if (
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/verify-2fa") ||
      originalRequest.url?.includes("/auth/google-login") ||
      originalRequest.url?.includes("/auth/refresh") 
    ) {
      return Promise.reject(error);
    }

    // Refresh token logic
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await api.post("/auth/refresh");
        const newAccessToken = res.data.access_token;

        localStorage.setItem("access_token", newAccessToken);

        originalRequest.headers = originalRequest.headers ?? {};
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch {
        localStorage.removeItem("access_token");
        window.location.href = "/auth/login";
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);