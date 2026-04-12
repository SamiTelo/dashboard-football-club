export interface Team {
  id: number;
  name: string;
  country?: string | null;

  // =========================
  // IMAGE (Cloudinary)
  // =========================
  logoUrl?: string | null;
  cloudinaryLogoId?: string | null;

  // =========================
  // RELATIONS (optionnel front)
  // =========================
  userId?: number;
  createdAt: string;
  updatedAt: string;
}

// =========================
// CREATE TEAM DTO
// =========================
export interface CreateTeamDto {
  name: string;
  country?: string;

  // image upload côté front (pas envoyé directement à Prisma)
  logoFile?: File;
}

// =========================
// UPDATE TEAM DTO
// =========================
export interface UpdateTeamDto {
  name?: string;
  country?: string;

  // optionnel si tu veux remplacer image
  logoFile?: File;
}

// =========================
// QUERY API (pagination + search)
// =========================
export interface GetTeamsQuery {
  search?: string;
  page?: number;
  limit?: number;
}

// =========================
// API RESPONSE PAGINATED 
// =========================
export interface PaginatedTeams {
  data: Team[];

  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// =========================
// UPLOAD LOGO RESPONSE
// =========================
export interface UploadTeamLogoResponse {
  logoUrl: string;
  cloudinaryLogoId: string;
}