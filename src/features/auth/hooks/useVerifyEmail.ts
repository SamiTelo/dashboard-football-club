"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./useAuth";
import { AxiosError } from "axios";

// Types de status
type Status = "info" | "loading" | "success" | "error";

export function useVerifyEmail(token: string | null, email?: string) {
  const router = useRouter();
  const { verifyEmail, resendVerification } = useAuth();

  const [status, setStatus] = useState<Status>(token ? "loading" : "info");
  const [message, setMessage] = useState(
    "Un lien de vérification a été envoyé à votre e-mail. Cliquez dessus pour activer votre compte. Pensez à vérifier vos spams si nécessaire."
  );
  const [cooldown, setCooldown] = useState(0);

  /* ------------------------------
   * Vérification du token
   ------------------------------ */
  useEffect(() => {
    if (!token) return;

    let isMounted = true;

    const handleVerify = async () => {
      try {
        await verifyEmail(token);
        if (!isMounted) return;

        setStatus("success");
        setMessage("Email vérifié avec succès. Redirection...");

        setTimeout(() => router.replace("/dashboard"), 1200);
      } catch (error: unknown) {
        if (!isMounted) return;

        setStatus("error");
        setMessage(
          error instanceof AxiosError
            ? error.response?.data?.message ||
              "Lien invalide ou expiré. Cliquez sur 'Réenvoyer' pour recevoir un nouveau lien."
            : "Lien invalide ou expiré. Cliquez sur 'Réenvoyer' pour recevoir un nouveau lien."
        );
      }
    };

    handleVerify();

    return () => {
      isMounted = false;
    };
  }, [token, router, verifyEmail]);

  /* ------------------------------
   * Cooldown pour éviter spam
   ------------------------------ */
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  /* ------------------------------
   * Resend email
   ------------------------------ */
  const handleResend = async (customEmail?: string) => {
    const emailToUse = customEmail || email;

    if (!emailToUse) {
      setStatus("error");
      setMessage("Veuillez entrer votre adresse e-mail.");
      return;
    }

    if (cooldown > 0) return; // Bloque si cooldown actif

    try {
      setStatus("loading");
      setMessage("Envoi du nouveau mail de vérification...");

      await resendVerification(emailToUse);

      setStatus("info");
      setMessage(
        "Un nouveau lien de vérification a été envoyé à votre e-mail. Pensez à vérifier vos spams."
      );

      setCooldown(30); // 30s de cooldown
    } catch (error: unknown) {
      setStatus("error");
      setMessage(
        error instanceof AxiosError
          ? error.response?.data?.message || "Erreur lors de l'envoi du mail."
          : "Erreur lors de l'envoi du mail."
      );
    }
  };

  return { status, message, handleResend, cooldown };
}