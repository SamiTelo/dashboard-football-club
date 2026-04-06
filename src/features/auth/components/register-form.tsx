"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // <-- Correct import pour router
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useAuth } from "../hooks/useAuth";
import { Spinner } from "@/components/ui/spinner";
import { GoogleLoginButton } from "./google-login-button";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { register, loading, error } = useAuth();

  // Définit l'état local du formulaire avec tous les champs nécessaires
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // Met à jour l'état formData à chaque modification d'un champ du formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Fonction qui gère la soumission du formulaire
  const router = useRouter(); // <-- initialise le router
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });
      console.log("Utilisateur créé :", res);

      router.replace(`/auth/verify-email?email=${formData.email}`);
    } catch (err: unknown) {
      console.error(err);
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6 my-8 md:my-0", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <FieldGroup>
        {/* Header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl md:text-4xl font-bold">
            Bonjour, <br />
            Bienvenue à <span className="text-green-400">Football Club</span>
          </h1>
          <p className="text-muted-foreground text-xs mt-2">
            Créez votre compte et accédez à toutes les fonctionnalités.
          </p>
        </div>

        {/* Nom */}
        <Field>
          <FieldLabel htmlFor="lastName">Nom</FieldLabel>
          <Input
            id="lastName"
            type="text"
            placeholder="Votre nom"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </Field>

        {/* Prénom */}
        <Field>
          <FieldLabel htmlFor="firstName">Prénom</FieldLabel>
          <Input
            id="firstName"
            type="text"
            placeholder="Votre prénom"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </Field>

        {/* Email + Password */}
        <Field className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="mail@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Field>
        </Field>

        {/* Bouton Register */}
        <Field>
          <Button
            type="submit"
            className="bg-green-400 w-full"
            disabled={loading}
          >
            {loading && <Spinner className="mr-2" data-icon="inline-start" />}
            {loading ? "Inscription..." : "Register"}
          </Button>
        </Field>

        {/* Affichage erreur */}
        {error && <p className="text-red-500 text-xs text-left">{error}</p>}

        <FieldSeparator>Ou continuez avec</FieldSeparator>

        {/* Google */}
        <Field>
          <GoogleLoginButton label="S’inscrire avec Google"/>

          <FieldDescription className="text-center mt-4">
            Vous avez déjà un compte ?{" "}
            <a
              href="/auth/login"
              className="underline underline-offset-4 text-green-400"
            >
              Login
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
