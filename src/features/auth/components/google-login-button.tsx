"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { useAuth } from "@/features/auth/hooks/useAuth";


// Typage Google Identity Services
interface CredentialResponse {
  credential?: string;
  clientId?: string;
  select_by?: string;
}
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
  const [sdkLoaded, setSdkLoaded] = useState(false);

  // Callback pour gérer la réponse Google
  const handleCredentialResponse = useCallback(
    async (response: CredentialResponse) => {
      if (!response.credential) {
        console.error("Aucun ID Token reçu");
        return;
      }

      try {
        setLoading(true);
        await googleLogin({ idToken: response.credential }); // aligné avec backend
      } catch (err) {
        console.error("Erreur Google Login:", err);
      } finally {
        setLoading(false);
      }
    },
    [googleLogin]
  );
  
  // Initialisation Google Identity Services
  useEffect(() => {
    if (!window.google?.accounts?.id) return;

    window.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      callback: handleCredentialResponse,
    });
  }, [handleCredentialResponse]);

  // Ouvre la popup Google
  const handleClick = () => {
    if (!window.google?.accounts?.id) {
      console.error("Google Identity Services non chargé");

      return;
    }
    window.google.accounts.id.prompt();
  };

  return (
    <Button
      variant="outline"
      type="button"
      onClick={handleClick}
      className={cn("bg-gray-50 hover:bg-gray-100", className)}
      disabled={loading || !sdkLoaded}
    >
      {/* Logo Google */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 533.5 544.3"
        className="w-5 h-5 mr-2"
      >
        <path
          fill="#4285F4"
          d="M533.5 278.4c0-17.8-1.5-35-4.3-51.8H272v98h146.9c-6.3 33.8-25 62.4-53.4 81.5v67h86.3c50.7-46.7 79.7-115.5 79.7-194.7z"
        />
        <path
          fill="#34A853"
          d="M272 544.3c72.4 0 133.2-23.9 177.6-65.1l-86.3-67c-24.1 16.2-54.9 25.7-91.3 25.7-70 0-129.3-47.3-150.5-111.2H32.4v69.9C76.4 481.5 167.3 544.3 272 544.3z"
        />
        <path
          fill="#FBBC05"
          d="M121.5 323.6c-4.7-14-7.4-28.9-7.4-44s2.7-30 7.4-44v-69.9H32.4C11.6 213.5 0 246.8 0 278.4s11.6 64.9 32.4 90.7l89.1-69.9z"
        />
        <path
          fill="#EA4335"
          d="M272 109.7c37.2 0 70.7 12.8 97 33.7l72.8-72.8C404.9 30 344 0 272 0 167.3 0 76.4 62.8 32.4 157.1l89.1 69.9c21.2-63.9 80.5-111.3 150.5-111.3z"
        />
      </svg>

      {loading && <Spinner className="mr-2" />}
      {loading ? "Connexion..." : label}
    </Button>
  );
}