import { api } from "@/lib/api";
import { CreateUserDto, ForgotPasswordDto, GoogleLoginDto, LoginUserDto, ResetPasswordDto} from "../types/auth-types";


export const register = (data: CreateUserDto) => api.post("/auth/register", data);
export const login = (data: LoginUserDto) => api.post("/auth/login", data);
export const verify2FA = (data: { code: string }) => api.post("/auth/verify-2fa", { code: data.code });
export const logout = () => api.post("/auth/logout");
export const refreshToken = () => api.post("/auth/refresh");
export const getProfile = () => api.get("/auth/profile");
export const verifyEmail = (token: string) => api.post("/auth/verify-email", { token });
export const forgotPassword = (data: ForgotPasswordDto) => api.post("/auth/forgot-password", data);
export const resetPassword = (data: ResetPasswordDto) => api.post("/auth/reset-password", data);
export const resendVerification = (email: string) => api.post("/auth/resend-verification", { email });
export const googleLogin = (data: GoogleLoginDto) =>api.post("/auth/google-login", data);