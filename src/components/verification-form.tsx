"use client"
import {
  Field,
  FieldGroup,
} from "./ui/field";
import { Button } from "./ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/src/components/ui/input-otp";
import * as React from "react"
import { cn } from "../lib/utils";

export function VerificationForm({
  className,
  ...props
}: React.ComponentProps<"form">) {

    const [value, setValue] = React.useState("000000")
  return (
    <form
      className={cn("flex flex-col gap-6 my-8 md:my-0", className)}
      {...props}
    >
      <FieldGroup>
        {/* Header */}
        <div className="flex flex-col gap-1 text-center">
          <h1 className="text-3xl md:text-4xl font-bold">
            Code de  <span className="text-green-400">vérification</span>
          </h1>
          <p className="text-muted-foreground text-xs mt-2">
            Veuillez saisir le code OTP récue par mail ci-dessous
          </p>
        </div>

        {/* code OTP */}
       <div className="flex justify-center my-4 md:my-6">
         <InputOTP maxLength={6} value={value} onChange={setValue}>
          <InputOTPGroup>
            <InputOTPSlot index={0} aria-invalid />
            <InputOTPSlot index={1} aria-invalid />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={2} aria-invalid />
            <InputOTPSlot index={3} aria-invalid />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={4} aria-invalid />
            <InputOTPSlot index={5} aria-invalid />
          </InputOTPGroup>
        </InputOTP>
       </div>

        {/* Bouton Login */}
        <Field>
          <Button type="submit" className="bg-green-400">
            Envoyer
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
