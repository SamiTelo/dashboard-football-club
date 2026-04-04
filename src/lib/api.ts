// api.ts
import axios from "axios";

export const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

// Intercepteur global pour gérer 401 + redirection 2FA
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const twoFARequired = document.cookie.includes("twoFARequired=true");
      if (twoFARequired) {
        window.location.href = "/auth/verify-2fa"; // ← redirection forcée pour 2FA
      } else {
        window.location.href = "/auth/login"; // ← redirection login normale
      }

      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);