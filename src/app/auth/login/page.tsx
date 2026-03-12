import { LoginForm } from "@/features/auth/login/login-form";
import Image from "next/image";

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
            <LoginForm/>
          </div>
        </div>
      </div>

       {/*---------------------------------------------------
          BLOC RIGHT: Image
       -------------------------------------------------------*/}
      <div className="order-1 lg:order-2 relative bg-[url('/assets/img.jpg')] bg-cover bg-center min-h-150 lg:min-h-screen flex items-center justify-center">

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
          <p className="mb-6 text-white/90 text-left">
            Vous souhaitez découvrir la plateforme sans créer de compte ?
            Utilisez les identifiants ci-dessous pour accéder à la version démo.
          </p>
          <p className="text-xs sm:text-sm mb-8 text-white/70 text-left">
            Accès invité limité à la consultation des fonctionnalités
            principales.
          </p>

           {/* Access demo */}
          <div className="bg-black/30 rounded-lg p-4 px-10 text-sm w-full sm:text-base space-y-2 mb-6 text-left">
            <p>
              <span className="font-semibold text-green-400">Email :</span>{" "}
              demo@footballclub.com
            </p>
            <p>
              <span className="font-semibold text-green-400">
                Mot de passe :
              </span>{" "}
              demo123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
