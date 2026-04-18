"use client";

import { Search, Mail, Bell } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { LogoutButton } from "@/features/auth/components/logout-button";
import { Skeleton } from "@/components/ui/skeleton";
import { SidebarTrigger } from "@/features/dashbaord/components/ui/sidebar";
import { Separator } from "@/features/dashbaord/components/ui/separator";

export default function DashboardHeader() {
  const { user, loading } = useAuth(true);

  const userName = user ? `${user.firstName} ${user.lastName}` : "";
  const userEmail = user?.email || "";

  const initials = userName
    ? userName
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "";

  return (
    <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center justify-between bg-white/70 backdrop-blur-md border-b border-gray-100 px-4 md:px-6">
      {/* ================= LEFT ================= */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <SidebarTrigger className="text-green-500" />

        <Separator orientation="vertical" className="h-4 hidden md:block" />

        {/* SEARCH (desktop only) */}
        <div className="hidden md:flex items-center gap-3 rounded-xl bg-[#F8F7FA] px-4 py-2 w-full max-w-sm">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* ================= RIGHT ================= */}
      <div className="flex items-center gap-4 md:gap-6 ml-auto">
        {/* ICONS */}
        <div className="flex items-center gap-4 text-muted-foreground">
          <LogoutButton />
          <Mail className="hidden sm:block h-5 w-5 cursor-pointer hover:text-green-500 transition" />
          <Bell className="h-5 w-5 cursor-pointer hover:text-green-500 transition" />
        </div>

        {/* USER INFO */}
        <div className="flex items-center gap-3 min-w-35 justify-end">
          {loading ? (
            <>
              <Skeleton className="h-9 w-9 rounded-full" />
              <div className="hidden md:block space-y-2">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3 w-32" />
              </div>
            </>
          ) : (
            <>
              <div className="h-9 w-9 flex items-center justify-center rounded-full bg-green-100 text-green-600 font-bold text-sm">
                {initials}
              </div>

              <div className="hidden md:block leading-tight">
                <p className="text-sm font-semibold truncate">{userName}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {userEmail}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
