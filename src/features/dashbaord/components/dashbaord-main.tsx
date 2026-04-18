"use client";

import { StatsCards } from "@/features/players/components/stats-cards";
import { Hand } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";
import PlayersList from "@/features/players/players-list";

export default function DashboardMain() {
  const { user, loading } = useAuth(true);

  const userName = user ? `${user.firstName} ${user.lastName}` : "";

  return (
    <div className="p-0 bg-[#F8F7FA] min-h-screen text-[13px] md:text-[14px] font-sans text-[#5d596c]">
      <p className="mt-6">Tableau de bord /</p>
      <br />

      {/* HERO */}
      <div className="bg-green-100 py-5 px-4 sm:px-6 mb-6 rounded-xl">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center gap-2">
            <Hand className="text-green-500 shrink-0" />

            <span className="text-sm text-gray-600">Bonjour</span>

            {loading ? (
              <Skeleton className="h-4 w-24 rounded-md" />
            ) : (
              <strong className="text-gray-800">{userName}</strong>
            )}
          </div>

          <p className="text-sm text-gray-600">
            Bienvenue sur{" "}
            <span className="text-green-600 font-semibold">Football Club</span>
          </p>
        </div>
      </div>

      {/* STATS */}
      <StatsCards />

      {/* PLAYERS PREVIEW */}
      <div className="bg-white rounded-lg border border-gray-100 mt-6">
        <PlayersList />
      </div>
    </div>
  );
}
