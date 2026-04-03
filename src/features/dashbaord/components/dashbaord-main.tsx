"use client";

import { Pagination } from "./pagination";
import { usePlayersExport } from "@/features/players/hooks/players-export-pdf";
import { StatsCards } from "@/features/players/components/stats-cards";
import { PlayersFilters } from "@/features/players/components/players-filters";
import { PlayersActions } from "@/features/players/components/players-actions";
import { PlayersTable } from "@/features/players/components/players-table";
import { Hand } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";

export default function PlayersList() {
  const { exportPDF } = usePlayersExport();

   const { user } = useAuth(true); // true = autoLoadProfile
   const userName = user ? `${user.firstName} ${user.lastName}` : "Utilisateur";

  return (
    <div className="p-0 bg-[#F8F7FA] min-h-screen text-[13px] md:text-[14px] font-sans text-[#5d596c]">

       <p>Tableau de bord /</p>
      <br />

      {/* Hero */}
      <div className="bg-green-100 py-4 px-4 sm:px-6 mb-6 rounded-xl">
        <p className="flex items-start sm:items-center gap-2 text-sm sm:text-base md:text-[14px] leading-relaxed">
          <Hand className="text-green-500 mt-1 sm:mt-0 shrink-0" />

          <span>
            Bonjour <strong>{userName}</strong>, bienvenue sur
            <span className="text-green-500 font-semibold ml-1">
              Football Club
            </span>
          </span>
        </p>
      </div>

      <StatsCards />

      <div className="bg-white rounded-lg border border-gray-100">
        <PlayersFilters />
        <PlayersActions onExport={exportPDF} />
        <PlayersTable />
      </div>

      <Pagination />
    </div>
  );
}
