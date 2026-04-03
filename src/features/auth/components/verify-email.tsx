"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MailCheck } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useVerifyEmail } from "../hooks/useVerifyEmail";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email") || undefined;

  const [resendEmail, setResendEmail] = useState(email || "");
  const { status, message, handleResend, cooldown } = useVerifyEmail(
    token,
    email,
  );

  const messageColor =
    status === "error"
      ? "text-red-500"
      : status === "success"
        ? "text-green-500"
        : "text-gray-500";

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative rounded-3xl p-8 md:p-12 max-w-xl w-full text-center"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 120 }}
          className={`w-20 h-20 mx-auto flex items-center justify-center rounded-full mb-6 ${
            status === "success"
              ? "bg-green-100"
              : status === "error"
                ? "bg-red-100"
                : "bg-emerald-100"
          }`}
        >
          <MailCheck
            className={`w-10 h-10 ${
              status === "success"
                ? "text-green-400"
                : status === "error"
                  ? "text-red-400"
                  : "text-green-400"
            }`}
          />
        </motion.div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Vérification de votre e-mail
        </h1>

        {/* Message */}
        <p
          className={`leading-relaxed mb-6 text-sm md:text-base ${messageColor}`}
        >
          {status === "loading" ? "Vérification en cours..." : message}
        </p>

        {/* Bouton ouvrir app mail */}
        {(status === "info" || !token) && (
          <Link href="mailto:">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="block w-full bg-green-400 hover:bg-black text-white font-semibold py-3 rounded-full mb-4"
            >
              Ouvrir mon application e-mail
            </motion.div>
          </Link>
        )}

        {/* CAS 1 : Email connu → simple bouton Réenvoyer */}
        {(status === "info" || !token) && email && (
          <p className="mt-2 text-sm text-gray-500">
            Vous n&apos;avez pas reçu l&apos;e-mail?{" "}
            <button
              onClick={() => handleResend()}
              disabled={status === "loading" || cooldown > 0}
              className={`text-green-400 font-medium hover:underline ${
                status === "loading" || cooldown > 0
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {cooldown > 0 ? `Réenvoyer dans ${cooldown}s` : "Réenvoyer"}
            </button>
          </p>
        )}

        {/* CAS 2 : Token expiré ET email inconnu → formulaire */}
        {status === "error" && !email && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleResend(resendEmail);
            }}
            className="mt-6 text-left"
          >
            <FieldGroup>

              {/* Email */}
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  type="email"
                  id="resendEmail"
                  value={resendEmail}
                  onChange={(e) => setResendEmail(e.target.value)}
                  required
                />
              </Field>

              {/* Bouton réenvoyer */}
              <Field>
                <Button
                  className="bg-green-400 w-full"
                 type="submit"
                disabled={!resendEmail || cooldown > 0}
                >
                  {cooldown > 0
                  ? `Réenvoyer dans ${cooldown}s`
                  : "Réenvoyer"}
                </Button>
              </Field>

            </FieldGroup>
          </form>
        )}
      </motion.div>
    </div>
  );
}
