"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export function useVerifyEmail(token?: string) {
  const router = useRouter();
  const [status, setStatus] = useState(
    "Un lien de vérification a été envoyé à votre e-mail. Cliquez dessus pour activer votre compte. Pensez à vérifier vos spams si nécessaire."
  );

  useEffect(() => {
    if (!token) return;

    const verifyEmail = async () => {
      try {
        await axios.post("/api/auth/verify-email", { token }, { withCredentials: true });

        setStatus("Email vérifié ✅ Redirection vers le dashboard...");
        setTimeout(() => router.push("/dashboard"), 1500); // petite pause pour voir le message
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setStatus(err.response?.data?.message || "Erreur lors de la vérification");
        } else if (err instanceof Error) {
          setStatus(err.message);
        } else {
          setStatus("Erreur inconnue lors de la vérification");
        }
      }
    };

    verifyEmail();
  }, [token, router]);

  return { status };
}