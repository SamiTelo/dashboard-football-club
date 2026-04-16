"use client";

// import { Pagination } from "./pagination";
import { usePlayersExport } from "@/features/players/hooks/players-export-pdf";
import { StatsCards } from "@/features/players/components/stats-cards";
import { PlayersFilters } from "@/features/players/components/players-filters";
import { PlayersActions } from "@/features/players/components/players-actions";
import { PlayersTable } from "@/features/players/components/players-table";
import { Hand } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";

export default function PlayersList() {
  const { exportPDF } = usePlayersExport();
  const { user, loading } = useAuth(true);

  const userName = user ? `${user.firstName} ${user.lastName}` : "";

  return (
    <div className="p-0 bg-[#F8F7FA] min-h-screen text-[13px] md:text-[14px] font-sans text-[#5d596c]">
      <p className="mt-6">Tableau de bord /</p>
      <br />

       {/* Hero */}
      <div className="bg-green-100 py-4 px-4 sm:px-6 mb-6 rounded-xl">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-sm sm:text-base md:text-[14px] leading-relaxed">
          <div className="flex items-center">
            <Hand className="text-green-500 shrink-0" />
          </div>
          <p className="flex flex-wrap items-center gap-x-1 gap-y-1">
            <span>Bonjour</span>

            {loading ? (
              <Skeleton className="h-4 w-24 rounded-md" />
            ) : (
              <strong className="text-gray-800">{userName}</strong>
            )}

            <span>, bienvenue sur</span>
            <span className="text-green-600 font-semibold">Football Club</span>
          </p>
        </div>
      </div>

      <StatsCards />

      <div className="bg-white rounded-lg border border-gray-100">
        <PlayersFilters />
        <PlayersActions onExport={exportPDF} />
        <PlayersTable />
      </div>

      {/* <Pagination/>*/}
    </div>
  );
}
