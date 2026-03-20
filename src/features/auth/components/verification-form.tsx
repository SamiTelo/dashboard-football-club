"use client";

import * as React from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Field,
  FieldGroup,
} from "@/components/ui/field";

import { Button } from "@/components/ui/button";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { cn } from "@/lib/utils";
import { verify2FA } from "../services/auth-services";

export function VerificationForm({
  className,
  ...props
}: React.ComponentProps<"form">) {

  const router = useRouter();
  const searchParams = useSearchParams();

  const userId = searchParams.get("userId");

  const [value, setValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (value.length !== 6) {
      setError("Veuillez entrer un code valide");
      return;
    }

    if (!userId) {
      setError("Utilisateur invalide");
      return;
    }

    setLoading(true);

    try {
      await verify2FA({
        userId,
        code: value,
      });

      setSuccess("Code validé avec succès");

      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);

    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Code invalide");
      } else {
        setError("Une erreur est survenue");
      }
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

        <div className="flex flex-col gap-1 text-center">
          <h1 className="text-3xl md:text-4xl font-bold">
            Code de <span className="text-green-400">vérification</span>
          </h1>
        </div>

        <div className="flex justify-center my-4 md:my-6">
          <InputOTP maxLength={6} value={value} onChange={setValue}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Field>
          <Button
            type="submit"
            className="bg-green-400 w-full"
            disabled={loading || value.length !== 6}
          >
            {loading ? "Vérification..." : "Envoyer"}
          </Button>
        </Field>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {success && <p className="text-green-500 text-sm text-center">{success}</p>}

      </FieldGroup>
    </form>
  );
}