import { AppSidebar } from "@/features/dashbord/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/features/dashbord/components/ui/sidebar"

import { Separator } from "@/features/dashbord/components/ui/separator"

import { Search, Mail, Bell, LogOut } from "lucide-react"
import Image from "next/image"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentYear = new Date().getFullYear()

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset className="flex flex-col h-screen overflow-x-hidden">

        {/* HEADER */}
        <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center justify-between shadow-xs bg-white/60 backdrop-blur px-3 md:px-6">

          {/* LEFT */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <SidebarTrigger className="text-green-400" />
            <Separator orientation="vertical" className="h-4 hidden md:block" />

            {/* SEARCH (desktop seulement) */}
            <div className="hidden md:flex items-center gap-3 rounded-xl bg-[#F8F7FA] px-4 py-2 w-full max-w-sm">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Search"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3 md:gap-6">

            {/* ICONS */}
            <div className="flex items-center gap-4 text-muted-foreground">
              <LogOut className="h-5 w-5 cursor-pointer text-red-500 hover:text-green-400 transition" />
              <Mail className="hidden sm:block h-5 w-5 cursor-pointer hover:text-green-400 transition" />
              <Bell className="h-5 w-5 cursor-pointer hover:text-green-400 transition" />
            </div>

            {/* USER */}
            <div className="flex items-center gap-3">
              <div className="relative h-9 w-9 overflow-hidden rounded-full">
                <Image
                  src="/assets/photo.png"
                  alt="user"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="hidden md:block leading-tight">
                <p className="text-sm font-semibold">Samuel Tiemtore</p>
                <p className="text-xs text-muted-foreground">
                  samdev10@mail.com
                </p>
              </div>
            </div>

          </div>
        </header>

        {/* MAIN */}
        <main className="flex flex-1 flex-col gap-4 bg-[#F8F7FA] p-4 md:p-6">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="bg-white">
          <div className="flex justify-center py-4 px-4">
            <p className="text-xs text-gray-400 text-center">
              Copyright {currentYear}. Tous droits réservés. Développement et design par{" "}
              <span className="text-green-400 font-medium">
                Samuel TIEMTORE
              </span>
            </p>
          </div>
        </footer>

      </SidebarInset>
    </SidebarProvider>
  )
}