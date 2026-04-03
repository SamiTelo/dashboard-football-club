"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// API
import { resetPassword } from "../services/auth-services";
import { Spinner } from "@/components/ui/spinner";

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  const searchParams = useSearchParams();

  //récupère le token depuis l'URL (?token=xxx)
  const token = searchParams.get("token");
  
  // Définit l'état local du formulaire avec tous les champs nécessaires
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);
    setSuccess(null);

    // vérification côté frontend
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    if (!token) {
      setError("Token invalide ou manquant");
      return;
    }

    setLoading(true);

    try {
      await resetPassword({
        token,
        newPassword: password,
      });

      setSuccess("Mot de passe réinitialisé avec succès");

      // redirection après succès
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    } catch (err: unknown) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-6 my-8 md:my-0", className)}
      {...props}
    >
      <FieldGroup>
        {/* Header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl font-bold">
            Réinitialiser <br />
            le <span className="text-green-400">mot de passe</span>
          </h1>
          <p className="text-muted-foreground text-xs mt-2">
            Saisissez votre nouveau mot de passe et confirmez-le.
          </p>
        </div>

        {/* Nouveau mot de passe */}
        <Field>
          <FieldLabel htmlFor="password">Nouveau mot de passe</FieldLabel>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Field>

        {/* Confirmation */}
        <Field>
          <FieldLabel htmlFor="confirmPassword">
            Confirmer mot de passe
          </FieldLabel>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Field>

        {/* Bouton */}
        <Field>
          <Button
            type="submit"
            className="bg-green-400 w-full"
            disabled={loading}
          >
            {loading && <Spinner className="mr-2" data-icon="inline-start" />}
            {loading ? "Modification..." : "Changer le mot de passe"}
          </Button>
        </Field>

        {/* Messages */}
        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        {success && (
          <p className="text-green-500 text-sm text-center">{success}</p>
        )}

        {/* Info */}
        <Field>
          <FieldDescription className="text-center text-xs">
            Si vous n&apos;avez pas demandé cette action, ignorez ce message.
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}