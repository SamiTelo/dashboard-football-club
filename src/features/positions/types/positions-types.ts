export interface Position {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

// =========================
// CREATE DTO
// =========================
export interface CreatePositionDto {
  name: string;
}

// =========================
// UPDATE DTO
// =========================
export interface UpdatePositionDto {
  name?: string;
}

// =========================
// PAGINATED RESPONSE (ALIGN TEAM)
// =========================
export interface PaginatedPositions {
  data: Position[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// =========================
// QUERY PARAMS
// =========================
export interface GetPositionsParams {
  search?: string;
  page?: number;
  limit?: number;
}