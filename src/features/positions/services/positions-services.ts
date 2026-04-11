import { api } from "@/lib/api";
import {
  CreatePositionDto,
  UpdatePositionDto,
  Position,
  PaginatedPositions,
  GetPositionsParams,
} from "../types/positions-types";

export const positionService = {
  // GET /position?search=&page=&limit=
  async getAll(params?: GetPositionsParams): Promise<PaginatedPositions> {
    const { data } = await api.get("/position", {
      params,
    });
    return data;
  },

  // GET /position/:id
  async getOne(id: number): Promise<Position> {
    const { data } = await api.get(`/position/${id}`);
    return data;
  },

  // POST /position
  async create(payload: CreatePositionDto): Promise<Position> {
    const { data } = await api.post("/position", payload);
    return data;
  },

  // PATCH /position/:id
  async update(id: number, payload: UpdatePositionDto): Promise<Position> {
    const { data } = await api.patch(`/position/${id}`, payload);
    return data;
  },

  // DELETE /position/:id
  async delete(id: number): Promise<{ id: number }> {
    const { data } = await api.delete(`/position/${id}`);
    return data;
  },
};