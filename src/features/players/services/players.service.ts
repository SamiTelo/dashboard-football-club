import { api } from "@/lib/api";
import {
  CreatePlayerDto,
  UpdatePlayerDto,
  Player,
  PaginatedPlayers,
  UploadPlayerImageResponse,
} from "../types/players-types";

export const playerService = {
  // =========================
  // GET ALL
  // =========================
  async getAll(params: {
    search?: string;
    page?: number;
    limit?: number;
    teamId?: number;
    positionId?: number;
  }): Promise<PaginatedPlayers> {
    const { data } = await api.get("/player", { params });
    return data;
  },

  // =========================
  // GET ONE
  // =========================
  async getOne(id: number): Promise<Player> {
    const { data } = await api.get(`/player/${id}`);
    return data;
  },

  // =========================
  // CREATE
  // =========================
  async create(payload: CreatePlayerDto): Promise<Player> {
    const { data } = await api.post("/player", payload);
    return data;
  },

  // =========================
  // UPDATE
  // =========================
  async update(id: number, payload: UpdatePlayerDto): Promise<Player> {
    const { data } = await api.patch(`/player/${id}`, payload);
    return data;
  },

  // =========================
  // DELETE
  // =========================
  async delete(id: number): Promise<{ id: number }> {
    const { data } = await api.delete(`/player/${id}`);
    return data;
  },

  // =========================
  // UPLOAD PLAYER IMAGE
  // =========================
  async uploadImage(
    playerId: number,
    file: File
  ): Promise<UploadPlayerImageResponse> {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await api.post(
      `/upload/player/${playerId}/image`,
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