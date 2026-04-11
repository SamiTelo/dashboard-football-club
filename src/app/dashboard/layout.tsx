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
              Copyright {new Date().getFullYear()}. Tous droits réservés.
              Développement et design par{" "}
              <span className="text-green-400 font-medium">
                Samuel Tiemtore
              </span>
            </p>
          </div>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}