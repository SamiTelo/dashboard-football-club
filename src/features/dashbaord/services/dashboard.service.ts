import { api } from "@/lib/api";

export type DashboardStats = {
  players: number;
  teams: number;
  positions: number;
};

export const dashboardService = {
  // =========================
  // GET STATS
  // =========================
  async getStats(): Promise<DashboardStats> {
    const { data } = await api.get("/dashboard/stats");
    return data;
  },
};