"use client";

import * as React from "react";
import { Field, FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/features/auth/hooks/useAuth";

export function Verify2FaForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { verify2FA, loading, error } = useAuth();

  const [value, setValue] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (value.length !== 6) return;

    try {
      await verify2FA({ code: value });
    } catch {
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
          <p className="text-muted-foreground text-xs mt-2">
            Veuillez saisir le code OTP récue par mail ci-dessous
          </p>
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
            disabled={loading}
          >
            {loading && <Spinner className="mr-2" />}
            {loading ? "Vérification..." : "Vérifier"}
          </Button>
        </Field>

        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}
      </FieldGroup>
    </form>
  );
}