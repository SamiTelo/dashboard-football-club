"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import * as authService from "../services/auth-services";
import {
  CreateUserDto,
  ForgotPasswordDto,
  LoginUserDto,
  ResetPasswordDto,
  User,
} from "../types/auth-types";
import { parseAxiosError } from "@/lib/axios-helper";

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
   * GOOGLE LOGIN
   --------------------------- */

  const googleLogin = async (dto: { idToken: string }) => {
    setLoading(true);
    setError("");

    try {
      const res = await authService.googleLogin(dto);
      const data = res.data;

      if (data.user) setUser(data.user);

      router.replace("/dashboard");
    } catch (err: unknown) {
      const message = parseAxiosError(err);
      setError(message);
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
      const res = await authService.login(dto);
      const data = res.data;

      if (data.requires2FA) {
        router.replace("/auth/verify-2fa");
        return;
      }

      if (data.user) setUser(data.user);
      router.replace("/dashboard");
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
      const res = await authService.verify2FA(dto);
      setUser(res.data.user);
      router.replace("/dashboard");
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

      router.replace("/auth/login");
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
      throw err;
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
      setError(parseAxiosError(err));
      throw err;
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
      throw err;
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
      throw err;
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
      throw err;
    }
  };

  const resetPassword = async (dto: ResetPasswordDto) => {
    try {
      return await authService.resetPassword(dto);
    } catch (err: unknown) {
      const message = parseAxiosError(err);
      setError(message);
      throw err;
    }
  };

  return {
    user,
    setUser,
    loading,
    error,
    register,
    googleLogin,
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
