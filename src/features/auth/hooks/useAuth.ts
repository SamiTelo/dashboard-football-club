"use client";

import { useState, useEffect } from "react";
import * as authService from "../services/auth-services";
import {
  CreateUserDto,
  ForgotPasswordDto,
  LoginUserDto,
  ResetPasswordDto,
  User,
} from "../types/auth-types";
import { parseAxiosError } from "@/lib/axios-helper";
import {
  login as loginService,
  verify2FA as verify2FAService,
} from "../services/auth-services";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

export const useAuth = (autoLoadProfile = false) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Charge le profil si autoLoadProfile = true
  useEffect(() => {
    if (!autoLoadProfile) return;

    const loadProfile = async () => {
      setLoading(true);
      try {
        const res = await authService.getProfile();
        setUser(res.data as User);
      } catch (err: unknown) {
        setUser(null);
        const message = parseAxiosError(err);
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [autoLoadProfile]);

  /* ---------------------------
   * REGISTER
   --------------------------- */
  const register = async (dto: CreateUserDto) => {
    setLoading(true);
    setError("");
    try {
      const res = await authService.register(dto);
      return res.data;
    } catch (err: unknown) {
      const message = parseAxiosError(err);
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /* ---------------------------
   * LOGIN
   --------------------------- */
  const login = async (dto: LoginUserDto) => {
    setLoading(true);
    setError("");
    try {
      const res = await loginService(dto);
      const data = res.data;

      // Si login normal
      if (data.user) setUser(data.user);

      return data;
    } catch (err: unknown) {
      const message = parseAxiosError(err);
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /* ---------------------------
   * VERIFY 2FA
   --------------------------- */
  const verify2FA = async (dto: { code: string }) => {
    setLoading(true);
    setError("");
    try {
      const res = await verify2FAService(dto);
      setUser(res.data.user);
      return res.data;
    } catch (err: unknown) {
      const message = parseAxiosError(err);
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /* ---------------------------
   * LOGOUT
   --------------------------- */
  const logout = async () => {
    setLoading(true);
    setError("");
    try {
      await authService.logout();
      setUser(null);
    } catch (err: unknown) {
      const message = parseAxiosError(err);
      setError(message);
      throw message;
    } finally {
      setLoading(false);
    }
  };

  /* ---------------------------
   * GET PROFILE
   --------------------------- */
  const getProfile = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await authService.getProfile();
      setUser(res.data as User);
    } catch (err: unknown) {
      setUser(null);
      const message = parseAxiosError(err);
      setError(message);
      throw message;
    } finally {
      setLoading(false);
    }
  };

  /* ---------------------------
   * REFRESH TOKEN
   --------------------------- */
  const refresh = async () => {
    try {
      const res = await authService.refreshToken();
      return res.data;
    } catch (err: unknown) {
      setUser(null);

      // Assurer que c'est bien un AxiosError
      const axiosErr = err as AxiosError;
      const message = parseAxiosError(axiosErr);
      setError(message);

      // Gérer 401 + 2FA
      if (axiosErr.response?.status === 401) {
        const twoFARequired = document.cookie.includes("twoFARequired=true");
        if (twoFARequired) {
          router.replace("/auth/verify-2fa");
        } else {
          router.replace("/auth/login");
        }
      }

      throw message;
    }
  };

  /* ---------------------------
   * VERIFY EMAIL
   --------------------------- */
  const verifyEmail = async (token: string) => {
    try {
      return await authService.verifyEmail(token);
    } catch (err: unknown) {
      const message = parseAxiosError(err);
      setError(message);
      throw message;
    }
  };

  /* ---------------------------
 * RESEND VERIFICATION EMAIL
 --------------------------- */
  const resendVerification = async (email: string) => {
    try {
      return await authService.resendVerification(email);
    } catch (err: unknown) {
      const message = parseAxiosError(err);
      setError(message);
      throw message;
    }
  };

  /* ---------------------------
   * FORGOT / RESET PASSWORD
   --------------------------- */
  const forgotPassword = async (dto: ForgotPasswordDto) => {
    try {
      return await authService.forgotPassword(dto);
    } catch (err: unknown) {
      const message = parseAxiosError(err);
      setError(message);
      throw message;
    }
  };

  const resetPassword = async (dto: ResetPasswordDto) => {
    try {
      return await authService.resetPassword(dto);
    } catch (err: unknown) {
      const message = parseAxiosError(err);
      setError(message);
      throw message;
    }
  };

  return {
    user,
    setUser,
    loading,
    error,
    register,
    login,
    logout,
    getProfile,
    refresh,
    verifyEmail,
    resendVerification,
    forgotPassword,
    resetPassword,
    verify2FA,
  };
};
