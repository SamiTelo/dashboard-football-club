"use client";

import { Pagination } from "./pagination";
import { usePlayersExport } from "@/features/players/hooks/players-export-pdf";
import { StatsCards } from "@/features/players/components/stats-cards";
import { PlayersFilters } from "@/features/players/components/players-filters";
import { PlayersActions } from "@/features/players/components/players-actions";
import { PlayersTable } from "@/features/players/components/players-table";


export default function PlayersList() {
  const { exportPDF } = usePlayersExport(); 

  return (
    <div className="p-0 bg-[#F8F7FA] min-h-screen text-[13px] md:text-[14px] font-sans text-[#5d596c]">
      
      <p>Tableau de bord /</p>
      <br />

      <StatsCards />

      <div className="bg-white rounded-lg border border-gray-100">
        <PlayersFilters />
        <PlayersActions onExport={exportPDF}/>
        <PlayersTable/>
      </div>

      <Pagination />
    </div>
  );
}