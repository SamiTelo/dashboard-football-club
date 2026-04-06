
export interface User {
  id: number;
  lastName: string;
  firstName: string;
  email: string;
  roleId?: number;
  isVerified: boolean;
  twoFactorCode?: string;
  twoFactorExpiry?: string; // DateTime côté API → string JSON
  refreshToken?: string;
  createdAt: string; // Date → string JSON
  updatedAt: string; // Date → string JSON
  // Si tu renvoies la relation Role depuis l'API
  role?: {
    id: number;
    name: string;
  };
}

export interface GoogleLoginDto {
  idToken: string;
}

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  // facultatif : role, etc.
  role?: string;
}

export interface LoginUserDto {
  email: string;
  password: string;
}

export interface VerifyEmailDto {
  token: string;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  token: string;
  newPassword: string;
}

export interface Verify2FaDto {
  userId: string;
  code: string;
}

export interface AuthResponse {
  access_token: string;
  refreshToken?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    roles?: string[];
  };
  twoFactorRequired?: boolean;
}