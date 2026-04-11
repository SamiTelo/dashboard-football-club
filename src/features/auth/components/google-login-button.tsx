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
 
  // Callback Google
  const handleCredentialResponse = useCallback(
    async (response: CredentialResponse) => {
      if (!response.credential) return;

      try {
        setLoading(true);
        await googleLogin({ idToken: response.credential });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [googleLogin]
  );

  // Init Google SDK
  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    if (!clientId) return;
    if (!window.google?.accounts?.id) return;

    try {
      window.google.accounts.id.cancel();
    } catch {}

    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: handleCredentialResponse,
    });
  }, [handleCredentialResponse]);

  // Click handler
  const handleClick = () => {
    if (!window.google?.accounts?.id) {
      console.error("Google SDK non chargé");
      return;
    }

    if (loading) return;

    try {
      window.google.accounts.id.prompt();
      setLoading(true); 
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleClick}
      disabled={loading}
      className={cn("bg-gray-50 hover:bg-gray-200", className)}
    >
      {loading && <Spinner className="mr-2" />}
      {loading ? "Connexion..." : label}
    </Button>
  );
}