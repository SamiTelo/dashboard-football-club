// =========================
// PLAYER ENTITY
// =========================
export interface Player {
  id: number;
  firstName: string;
  lastName: string;

  teamId: number;
  positionId: number;

  // =========================
  // IMAGE (Cloudinary)
  // =========================
  imageUrl?: string | null;
  cloudinaryPublicId?: string | null;

  // =========================
  // META
  // =========================
  createdAt: string;
  updatedAt: string;

  // =========================
  // RELATIONS (backend include)
  // =========================
  team?: {
    id: number;
    name: string;
    logoUrl?: string | null;
  };

  position?: {
    id: number;
    name: string;
  };
}

// =========================
// CREATE PLAYER DTO
// =========================
export interface CreatePlayerDto {
  firstName: string;
  lastName: string;
  teamId: number;
  positionId: number;

  // upload image côté front (non envoyé direct Prisma)
  imageFile?: File;

  imageUrl?: string;
  cloudinaryPublicId?: string;
}

// =========================
// UPDATE PLAYER DTO
// =========================
export interface UpdatePlayerDto {
  firstName?: string;
  lastName?: string;
  teamId?: number;
  positionId?: number;

  // remplacement image
  imageFile?: File;

  imageUrl?: string;
  cloudinaryPublicId?: string;
}

// =========================
// PAGINATED RESPONSE
// =========================
export interface PaginatedPlayers {
  data: Player[];

  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// =========================
// QUERY PARAMS
// =========================
export interface GetPlayersQuery {
  search?: string;
  teamId?: number;
  positionId?: number;

  page?: number;
  limit?: number;
}

// =========================
// UPLOAD RESPONSE
// =========================
export interface UploadPlayerImageResponse {
  imageUrl: string;
  cloudinaryPublicId: string;
}