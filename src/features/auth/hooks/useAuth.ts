"use client";

import { useState, useEffect } from "react";
import * as authService from "../services/auth-services";
import {
  CreateUserDto,
  ForgotPasswordDto,
  LoginUserDto,
  ResetPasswordDto,
  Verify2FaDto,
  User,
} from "../types/auth-types";
import { parseAxiosError } from "@/lib/axios-helper"; // ton helper pour les erreurs

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Charger automatiquement le profil au montage du composant
  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      try {
        const res = await authService.getProfile();
        setUser(res.data as User);
      } catch (err: unknown) {
        setUser(null);
        setError(parseAxiosError(err));
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

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
      setError(parseAxiosError(err));
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
      const res = await authService.login(dto);
      if (res.data.user) setUser(res.data.user as User);
      return res.data;
    } catch (err: unknown) {
      setError(parseAxiosError(err));
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
      setError(parseAxiosError(err));
      throw err;
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
      setError(parseAxiosError(err));
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
      setError(parseAxiosError(err));
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
      setError(parseAxiosError(err));
      throw err;
    }
  };

  const resetPassword = async (dto: ResetPasswordDto) => {
    try {
      return await authService.resetPassword(dto);
    } catch (err: unknown) {
      setError(parseAxiosError(err));
      throw err;
    }
  };

  /* ---------------------------
   * VERIFY 2FA
   --------------------------- */
  const verify2FA = async (dto: Verify2FaDto) => {
    try {
      return await authService.verify2FA(dto);
    } catch (err: unknown) {
      setError(parseAxiosError(err));
      throw err;
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
    forgotPassword,
    resetPassword,
    verify2FA,
  };
};