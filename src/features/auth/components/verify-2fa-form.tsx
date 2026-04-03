"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { Field, FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import { verify2FA } from "../services/auth-services";
import { Spinner } from "@/components/ui/spinner";
import { parseAxiosError } from "@/lib/axios-helper";

export function Verify2FaForm({ className, ...props }: React.ComponentProps<"form">) {
  const router = useRouter();
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

    setLoading(true);
    try {
      await verify2FA({ code: value });
      setSuccess("Code validé avec succès !");
      setTimeout(() => router.replace("/dashboard"), 500);
    } catch (err: unknown) {
      setError(parseAxiosError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6 my-8 md:my-0", className)} {...props}>
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
          <Button type="submit" className="bg-green-400 w-full" disabled={loading}>
            {loading && <Spinner className="mr-2" data-icon="inline-start" />}
            {loading ? "Vérification..." : "Envoyer"}
          </Button>
        </Field>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {success && <p className="text-green-500 text-sm text-center">{success}</p>}
      </FieldGroup>
    </form>
  );
}