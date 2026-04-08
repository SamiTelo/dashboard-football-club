import axios from "axios";

export const api = axios.create({
  baseURL: "/api", // Proxy vers ton backend
  withCredentials: true, // Envoie automatiquement les cookies httpOnly
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Ignore login / verify-2fa / google-login: on ne touche pas à ces requêtes
    if (
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/verify-2fa") ||
      originalRequest.url?.includes("/auth/google-login") 
    ) {
      return Promise.reject(error);
    }

    // Gestion du refresh token sur les autres requêtes
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await api.post("/auth/refresh");
        const newAccessToken = res.data.access_token;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch {
        // Refresh échoué → redirection login
        window.location.href = "/auth/login";
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);
