import { AxiosErrorShape } from "@/features/auth/types/axios-types";


export const parseAxiosError = (err: unknown): string => {
  if (typeof err === "object" && err !== null) {
    const axiosErr = err as AxiosErrorShape;
    if (axiosErr.response?.data?.message) {
      return axiosErr.response.data.message;
    }
  }
  if (err instanceof Error) return err.message;
  return "Erreur inconnue";
};