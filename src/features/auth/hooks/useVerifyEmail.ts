"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./useAuth"; 
import { AxiosError } from "axios";

// Type pour gérer l'état de vérification
type Status = "info" | "loading" | "success" | "error";

export function useVerifyEmail(token: string | null, email?: string) {
  const router = useRouter();
  const { verifyEmail, resendVerification } = useAuth(); // On utilise les fonctions centralisées

  const [status, setStatus] = useState<Status>(token ? "loading" : "info");
  const [message, setMessage] = useState(
    "Un lien de vérification a été envoyé à votre e-mail. Cliquez dessus pour activer votre compte. Pensez à vérifier vos spams si nécessaire."
  );
  const [canResend, setCanResend] = useState(false); // Pour activer le bouton "Réenvoyer"

  useEffect(() => {
    if (!token) return; // Si pas de token → page info

    let isMounted = true; // Permet d'éviter les mises à jour d'état après démontage

    /* -----------------------------------------------
     * VERIFY EMAIL
     ---------------------------------------------------- */
    const handleVerify = async () => {
      try {
        await verifyEmail(token); // Utilisation du hook centralisé
        if (!isMounted) return;

        setStatus("success");
        setMessage("Email vérifié avec succès Redirection...");

        setTimeout(() => {
          router.replace("/dashboard"); // Redirection vers dashboard
        }, 1200);
      } catch (error: unknown) {
        if (!isMounted) return;

        setStatus("error");
        setMessage("Lien invalide ou expiré. veuillez cliquer sur le bouton 'Réenvoyer' ci dessous pour recevoir un nouveau lien.");
        setCanResend(true); // Permet de réenvoyer un nouveau mail

        // Si erreur Axios, on peut extraire message backend
        if (error instanceof AxiosError) {
          setMessage(error.response?.data?.message || "Lien invalide ou expiré. veuillez cliquer sur 'Réenvoyer' pour recevoir un nouveau lien.");
        }
      }
    };

    handleVerify();

    return () => {
      isMounted = false;
    };
  }, [token, router, verifyEmail]);

  /* -----------------------------------------------
   * RESEND VERIFICATION EMAIL
   ---------------------------------------------------- */
  const handleResend = async () => {
    if (!email) return;
    try {
      setStatus("loading");
      setMessage("Envoi du nouveau mail de vérification...");

      await resendVerification(email); // Fonction centralisée dans useAuth

      setStatus("info");
      setMessage("Un nouveau lien de vérification a été envoyé à votre e-mail. Cliquez dessus pour activer votre compte. Pensez à vérifier vos spams si nécessaire.");
      setCanResend(false); // Désactive le bouton après envoi
    } catch (error: unknown) {
      setStatus("error");
      if (error instanceof AxiosError) {
        setMessage(
          error.response?.data?.message || "Erreur lors de l'envoi du mail."
        );
      } else {
        setMessage("Erreur lors de l'envoi du mail.");
      }
    }
  };

  return { status, message, canResend, handleResend };
}