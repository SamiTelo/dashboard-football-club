"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { useAuth } from "@/features/auth/hooks/useAuth";

interface GoogleLoginButtonProps {
  className?: string;
  label?: string;
}

export function GoogleLoginButton({
  className,
  label = "Se connecter avec Google",
}: GoogleLoginButtonProps) {
  const { googleLogin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(false);

  // Callback pour gérer la réponse Google
  const handleCredentialResponse = useCallback(
    async (response: CredentialResponse) => {
      if (!response.credential) {
        console.error("Aucun ID Token reçu");
        return;
      }

      try {
        setLoading(true);
        await googleLogin({ idToken: response.credential });
      } catch {
      } finally {
        setLoading(false);
      }
    },
    [googleLogin]
  );

  // Initialisation Google Identity Services
  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    if (!clientId) {
      console.error("GOOGLE CLIENT ID manquant !");
      return;
    }

    if (!window.google?.accounts?.id) {
      console.log("Google SDK pas encore prêt...");
      return;
    }

    try {
      window.google.accounts.id.cancel(); // réinitialise l'état du SDK
    } catch {}

    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: handleCredentialResponse,
    });

    console.log("Google initialisé avec:", clientId);
  }, [handleCredentialResponse]);

  // Ouvre la popup Google avec cooldown et alert
  const handleClick = () => {
    if (!window.google?.accounts?.id) {
      console.error("Google Identity Services non chargé");
      return;
    }

    if (cooldown) {
      console.warn(
        "Popup temporairement désactivée, réessayez dans quelques secondes."
      );
      alert("Connexion Google temporairement indisponible. Réessayez dans quelques secondes.");
      return;
    }

    try {
      window.google.accounts.id.prompt();

      // Active le cooldown de 5 secondes
      setCooldown(true);
      const timer = setTimeout(() => setCooldown(false), 5000);
      return () => clearTimeout(timer);
    } catch (err) {
      console.error("Erreur lors de l'ouverture de la popup Google:", err);
      alert("Connexion Google temporairement indisponible. Réessayez dans quelques secondes.");
    }
  };

  return (
    <Button
      variant="outline"
      type="button"
      onClick={handleClick}
      className={cn("bg-gray-50 hover:bg-gray-200", className)}
      disabled={loading || cooldown}
    >
      {loading && <Spinner className="mr-2" />}
      {loading ? "Connexion..." : label}
    </Button>
  );
}