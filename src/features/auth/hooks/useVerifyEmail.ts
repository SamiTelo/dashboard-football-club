"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./useAuth";

export function useVerifyEmail(token?: string) {
  const router = useRouter();
  const { verifyEmail } = useAuth();
  const [status, setStatus] = useState(
    "Un lien de vérification a été envoyé à votre e-mail. Cliquez dessus pour activer votre compte. Pensez à vérifier vos spams si nécessaire."
  );

  useEffect(() => {
    if (!token) return;

    const handleVerify = async () => {
      try {
        await verifyEmail(token);
        setStatus("Email vérifié ✅ Redirection vers le dashboard...");
        setTimeout(() => router.push("/dashboard"), 1500);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setStatus(error.message);
        } else {
          setStatus("Erreur inconnue lors de la vérification");
        }
      }
    };

    handleVerify();
  }, [token, router, verifyEmail]);

  return { status };
}