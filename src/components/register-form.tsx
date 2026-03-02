import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "./ui/field";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6 my-8 md:my-0", className)} {...props}>
      <FieldGroup>
        {/* Header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl font-bold">
            Bonjour, <br />
            Bienvenue à{" "}
            <span className="text-green-400">Football Club</span>
          </h1>
          <p className="text-muted-foreground text-xs mt-2">
            Créez votre compte et accédez à toutes les fonctionnalités de
            Football Club pour gérer votre équipe efficacement et suivre
            vos joueurs facilement.
          </p>
        </div>

        {/* Nom */}
        <Field>
          <FieldLabel htmlFor="nom">Nom</FieldLabel>
          <Input
            id="nom"
            type="text"
            placeholder="Votre nom"
            required
          />
        </Field>

        {/* Prénom */}
        <Field>
          <FieldLabel htmlFor="prenom">Prénom</FieldLabel>
          <Input
            id="prenom"
            type="text"
            placeholder="Votre prénom"
            required
          />
        </Field>

        {/* Email + Password en 2 colonnes */}
        <Field className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="mail@example.com"
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              required
            />
          </Field>
        </Field>

        {/* Bouton Register */}
        <Field>
          <Button type="submit" className="bg-green-400 w-full">
            Register
          </Button>
        </Field>

        <FieldSeparator>Or continue with</FieldSeparator>

        {/* Google */}
        <Field>
          <Button
            variant="outline"
            type="button"
            className="w-full flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 533.5 544.3"
              className="w-5 h-5"
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
            Sign up with Google
          </Button>

          <FieldDescription className="text-center mt-4">
            Already have an account?{" "}
            <a
              href="/login"
              className="underline underline-offset-4 text-green-400"
            >
              Sign in
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}