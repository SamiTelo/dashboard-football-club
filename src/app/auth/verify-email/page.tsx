"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { MailCheck } from "lucide-react";
import Link from "next/link";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // token depuis le lien email
  const [status, setStatus] = useState(
    "Un lien de vérification a été envoyé à votre e-mail. Cliquez dessus pour activer votre compte. Pensez à vérifier vos spams si nécessaire."
  );

  useEffect(() => {
    if (!token) return; // Pas de token → juste la page info

    const verifyEmail = async () => {
      try {
        const res = await fetch("/api/auth/verify-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
          credentials: "include", // important pour recevoir le cookie HttpOnly
        });

        if (!res.ok) throw new Error("Token invalide ou expiré");

        setStatus("Email vérifié ✅ Redirection vers le dashboard...");
        setTimeout(() => router.push("/dashboard"), 1500); // petite pause pour voir le message
      } catch (err: unknown) {
        if (err instanceof Error) {
          setStatus(err.message || "Erreur lors de la vérification");
        } else {
          setStatus("Erreur inconnue lors de la vérification");
        }
      }
    };

    verifyEmail();
  }, [token, router]);

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
          className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-emerald-100 mb-6"
        >
          <MailCheck className="w-10 h-10 text-green-400" />
        </motion.div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Vérifiez votre e-mail
        </h1>

        {/* Text */}
        <p className="text-gray-600 leading-relaxed mb-8 text-sm md:text-base">
          {status}
        </p>

        {!token && (
          <>
            {/* Open Email App Button */}
            <Link href="mailto:">
              <motion.div
                whileHover={{
                  scale: 1.05,
                  y: -3,
                  boxShadow: "0px 8px 15px rgba(0,0,0,0.2)",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="block w-full bg-green-400 hover:bg-black text-white font-semibold py-3 rounded-full shadow-lg"
              >
                Open Email App
              </motion.div>
            </Link>

            {/* Secondary Action */}
            <p className="mt-6 text-sm text-gray-500">
              Vous n&apos;avez pas reçu l&apos;e-mail?{" "}
              <button className="text-green-400 font-medium hover:underline">
                Réenvoyer
              </button>
            </p>
          </>
        )}
      </motion.div>
    </div>
  );
}