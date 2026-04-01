import axios from "axios";

export const api = axios.create({
  baseURL: "/api", // le proxy dans next.config.ts redirige vers l'API réelle
  withCredentials: true, // envoie automatiquement les cookies httpOnly
});

// Intercepteur pour gérer automatiquement le refresh token si access_token expiré
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Vérifie si c'est une 401 et que la requête n'a pas déjà tenté le refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Appelle la route refresh (le cookie refreshToken est envoyé automatiquement)
        const res = await api.post("/auth/refresh");

        const newAccessToken = res.data.access_token;

        // Injecte le nouveau token dans la requête originale et relance
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh échoué → utilisateur doit se reconnecter
        console.log("Refresh échoué, utilisateur déconnecté");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);