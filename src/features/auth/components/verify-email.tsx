"use client";

import { motion } from "framer-motion";
import { MailCheck } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useVerifyEmail } from "../hooks/useVerifyEmail";

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email") || undefined;

  // Utilise le hook avec token et email
  const { status, message, canResend, handleResend } = useVerifyEmail(token, email);

  // Définir une couleur pour le texte en fonction du status
  const messageColor =
    status === "error" ? "text-red-500" :
    status === "success" ? "text-green-500" :
    "text-gray-500";

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative rounded-3xl p-8 md:p-12 max-w-xl w-full text-center bg-white shadow-lg"
      >
        {/* Icon avec couleur selon le status */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 120 }}
          className={`w-20 h-20 mx-auto flex items-center justify-center rounded-full mb-6 ${
            status === "success" ? "bg-green-100" : status === "error" ? "bg-red-100" : "bg-emerald-100"
          }`}
        >
          <MailCheck
            className={`w-10 h-10 ${
              status === "success" ? "text-green-400" :
              status === "error" ? "text-red-400" :
              "text-emerald-400"
            }`}
          />
        </motion.div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Vérifiez votre e-mail
        </h1>

        {/* Text (Message) dynamique selon le status */}
        <p className={`leading-relaxed mb-8 text-sm md:text-base ${messageColor}`}>
          {status === "loading" ? "Vérification en cours..." : message}
        </p>

        {/* Button Open Email App (si pas de token ou token expiré) */}
        {(status === "info" || status === "error" || !token) && (
          <Link href="mailto:">
            <motion.div
              whileHover={{ scale: 1.05, y: -3, boxShadow: "0px 8px 15px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="block w-full bg-green-400 hover:bg-black text-white font-semibold py-3 rounded-full shadow-lg mb-4"
            >
              Open Email App
            </motion.div>
          </Link>
        )}

        {/* Bouton Réenvoyer (si email présent et page info ou token expiré) */}
        {(status === "error" || !token) && email && (
          <p className="mt-2 text-sm text-gray-500">
            Vous n&apos;avez pas reçu l&apos;e-mail?{" "}
            <button
              onClick={handleResend}
              disabled={!canResend || status === "loading"}
              className={`text-green-400 font-medium hover:underline ${
                !canResend || status === "loading" ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Réenvoyer
            </button>
          </p>
        )}
      </motion.div>
    </div>
  );
}