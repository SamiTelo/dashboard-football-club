"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { AppSidebar } from "@/features/dashbaord/components/app-sidebar";
import DashboardHeader from "@/features/dashbaord/components/dashboard-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/features/dashbaord/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const error = searchParams.get("error");
  const showUnauthorized = error === "unauthorized";

  useEffect(() => {
    if (showUnauthorized) {
      router.replace("/dashboard");
    }
  }, [showUnauthorized, router]);

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset className="flex flex-col h-screen overflow-x-hidden">
        {/* HEADER */}
        <DashboardHeader />

        {/* MAIN */}
        <main className="flex flex-1 flex-col gap-4 bg-[#F8F7FA] px-4 md:px-6 pb-10">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="bg-white">
          <div className="flex justify-center py-4 px-4">
            <p className="text-xs text-gray-400 text-center">
              Copyright {new Date().getFullYear()}.
            </p>
          </div>
        </footer>

        {/* POPUP ACCÈS NON AUTORISÉ */}
        {showUnauthorized && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-md text-center">
              <h2 className="text-red-600 text-lg font-bold">
                Accès non autorisé
              </h2>

              <p className="text-gray-600 text-sm mt-2">
                Cette section est réservée uniquement aux administrateurs.
              </p>

              <button
                onClick={() => router.replace("/dashboard")}
                className="mt-5 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Compris
              </button>
            </div>
          </div>
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}