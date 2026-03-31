"use client";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { MailCheck } from "lucide-react";
import { useVerifyEmail } from "../hooks/useVerifyEmail";

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { status } = useVerifyEmail(token ?? undefined);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative rounded-3xl p-8 md:p-12 max-w-xl w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 120 }}
          className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-emerald-100 mb-6"
        >
          <MailCheck className="w-10 h-10 text-green-400" />
        </motion.div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Vérifiez votre e-mail
        </h1>

        <p className="text-gray-600 leading-relaxed mb-8 text-sm md:text-base">
          {status}
        </p>
      </motion.div>
    </div>
  );
}