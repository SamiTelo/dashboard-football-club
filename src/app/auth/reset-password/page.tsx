import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";
import Image from "next/image";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
    
    {/*----------------------------------------------------
         BLOC LEFT: Form
      -----------------------------------------------------------*/}
      <div className="order-2 lg:order-1 flex flex-col gap-4 p-6 md:p-10">
        {/* Form centré */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-115">
             <Suspense fallback={<div>Loading...</div>}>
              <ResetPasswordForm />
            </Suspense>
          </div>
        </div>
      </div>

       {/*---------------------------------------------------
          BLOC RIGHT: Image
       -------------------------------------------------------*/}
      <div className="order-1 md:order-2 hidden md:flex relative bg-[url('/assets/register-img.jpg')] bg-cover bg-center min-h-100 md:min-h-screen items-center justify-center">

      {/* Logo */}
        <div className="absolute top-6 right-6 flex items-center gap-3 p-3 md:p-4 bg-white/10 backdrop-blur-sm border border-white/10 shadow-xl rounded-2xl">
          <a href="#" className="flex items-center gap-3 font-semibold text-lg">
            <div className="w-9 h-9 relative">
              <Image
                src="/assets/logo.png"
                alt="Football Club Logo"
                fill
                className="object-contain rounded-xl"
              />
            </div>
            <span className="text-white text-sm md:text-[15px] ">Football Club</span>
          </a>
        </div>

        {/* Texte */}
        <div className="relative text-center mt-0 md:mt-80 md:mx-4 text-white px-6 md:px-12 py-10 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 shadow-xl">
          <p className="mb-6 text-white/90 text-left text-3xl font-semibold">
            Le saviez-vous ?
          </p>
          <p className="text-xs sm:text-sm mb-8 text-white/70 text-left">
            En 2006, pendant la Coupe du Monde 2006, une trêve temporaire aurait été observée en Côte d’Ivoire après la qualification des Éléphants, menée par Didier Drogba
          </p>
        </div>
      </div>
    </div>
  );
}
