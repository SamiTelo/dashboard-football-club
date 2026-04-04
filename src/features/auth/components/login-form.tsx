"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field, FieldLabel, FieldGroup, FieldSeparator, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { useAuth } from "@/features/auth/hooks/useAuth";

export function LoginForm({ className, ...props }: React.ComponentProps<"form">) {
  const router = useRouter();
  const { login, error, loading } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login({ email: formData.email, password: formData.password });

      // Si 2FA requis, redirige vers la page verify-2fa
      if (res?.requires2FA) {
        router.replace("/auth/verify-2fa");
        return;
      }

      // Login normal → dashboard
      router.replace("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6 my-8 md:my-0", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl font-bold">
            Bonjour, <br />
            Bienvenue à <span className="text-green-400">Football Club</span>
          </h1>
          <p className="text-muted-foreground text-xs mt-2">
            Veuillez saisir votre email et mot de passe pour accéder à votre compte.
          </p>
        </div>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="mail@example.com" value={formData.email} onChange={handleChange} required />
        </Field>

        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
            <a href="/auth/forgot_password" className="ml-auto text-sm underline-offset-4 hover:underline hover:text-green-400">
              Mot de passe oublié ?
            </a>
          </div>
          <Input id="password" type="password" placeholder="••••••••" value={formData.password} onChange={handleChange} required />
        </Field>

        <Field>
          <Button type="submit" className="bg-green-400 w-full" disabled={loading}>
            {loading && <Spinner className="mr-2" />}
            {loading ? "Connexion..." : "Login"}
          </Button>
        </Field>

        {error && <p className="text-red-500 text-xs text-left">{error}</p>}

        <FieldSeparator>Ou continuez avec</FieldSeparator>

        <Field>
          <Button variant="outline" type="button" className="bg-gray-50 hover:bg-gray-100">
            {/* Google Icon */}
            Se connecter avec Google
          </Button>
          <FieldDescription className="text-center">
            Vous n&apos;avez pas de compte ?{" "}
            <a href="/auth/register" className="underline underline-offset-4 text-green-400">
              Register
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}