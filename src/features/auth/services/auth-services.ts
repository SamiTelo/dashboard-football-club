import { api } from "@/lib/api";
import { CreateUserDto, ForgotPasswordDto, LoginUserDto, ResetPasswordDto, Verify2FaDto } from "../types/auth-types";


export const register = (data: CreateUserDto) => api.post("/auth/register", data);
export const login = (data: LoginUserDto) => api.post("/auth/login", data);
export const logout = () => api.post("/auth/logout");
export const refreshToken = () => api.post("/auth/refresh");
export const getProfile = () => api.get("/auth/profile");
export const verifyEmail = (token: string) => api.post("/auth/verify-email", { token });
export const forgotPassword = (data: ForgotPasswordDto) => api.post("/auth/forgot-password", data);
export const resetPassword = (data: ResetPasswordDto) => api.post("/auth/reset-password", data);
export const verify2FA = (data: Verify2FaDto) => api.post("/auth/verify-2fa", data);