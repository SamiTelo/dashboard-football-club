import { RegisterForm } from "@/src/components/register-form";
import Image from "next/image";

export default function RegisterPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
  
      {/*----------------------------------------------------
         BLOC LEFT: Form
      -----------------------------------------------------------*/}
      <div className="order-2 lg:order-1 flex flex-col gap-4 p-6 md:p-10">
        {/* Form centré */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-115">
            <RegisterForm />
          </div>
        </div>
      </div>

      {/*---------------------------------------------------
          BLOC RIGHT: Image
       -------------------------------------------------------*/}
      <div className="order-1 lg:order-2 relative bg-[url('/assets/login-img.jpg')] bg-cover bg-center min-h-125 lg:min-h-screen">
        {/* Logo */}
        <div className="absolute top-6 left-6 flex items-center gap-3 p-4 bg-white/10 backdrop-blur-sm border border-white/10 shadow-xl rounded-2xl">
          <a href="#" className="flex items-center gap-3 font-semibold text-lg">
            <div className="w-9 h-9 relative">
              <Image
                src="/assets/logo.png"
                alt="Football Club Logo"
                fill
                className="object-contain rounded-xl"
              />
            </div>
            <span className="text-white">Football Club</span>
          </a>
        </div>
      </div>
    </div>
  );
}
