export interface Position {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePositionDto {
  name: string;
}

export interface UpdatePositionDto {
  name?: string;
}

export interface PaginatedPositions {
  data: Position[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface GetPositionsParams {
  search?: string;
  page?: number;
  limit?: number;
}