import { api } from "@/lib/api";
import { CreateTeamDto, PaginatedTeams, Team, UpdateTeamDto, UploadTeamLogoResponse } from "../types/teams-types";


export const teamService = {
  // =========================
  // GET ALL (pagination + search)
  // =========================
  async getAll(params: {
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedTeams> {
    const { data } = await api.get("/team", { params });
    return data;
  },

  // =========================
  // GET ONE
  // =========================
  async getOne(id: number): Promise<Team> {
    const { data } = await api.get(`/team/${id}`);
    return data;
  },

  // =========================
  // CREATE TEAM
  // =========================
  async create(payload: CreateTeamDto): Promise<Team> {
    const { data } = await api.post("/team", {
      name: payload.name,
      country: payload.country,
    });

    return data;
  },

  // =========================
  // UPDATE TEAM
  // =========================
  async update(id: number, payload: UpdateTeamDto): Promise<Team> {
    const { data } = await api.patch(`/team/${id}`, {
      name: payload.name,
      country: payload.country,
    });

    return data;
  },

  // =========================
  // DELETE TEAM
  // =========================
  async delete(id: number): Promise<{ id: number }> {
    const { data } = await api.delete(`/team/${id}`);
    return data;
  },

  // =========================
  // UPLOAD TEAM LOGO (IMPORTANT)
  // =========================
  async uploadLogo(
    teamId: number,
    file: File
  ): Promise<UploadTeamLogoResponse> {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await api.post(
      `/team/${teamId}/logo`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return data;
  },
};