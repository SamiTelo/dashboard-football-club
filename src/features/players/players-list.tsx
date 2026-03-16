"use client";

import { PlayersTable } from "./components/players-table";
import { PlayersFilters } from "./components/players-filters";
import { PlayersActions } from "./components/players-actions";
import { usePlayersExport } from "./hooks/players-export-pdf";
import { Pagination } from "@/features/dashbaord/components/pagination";

export default function PlayersList() {
  const { exportPDF } = usePlayersExport(); 



  return (
    <div className="p-0 bg-[#F8F7FA] min-h-screen text-[13px] md:text-[14px] font-sans text-[#5d596c]">
      
      <p>Listes des joueurs /</p>
      <br />

      <div className="bg-white rounded-lg border border-gray-100">
        <PlayersFilters />
        <PlayersActions onExport={exportPDF} />
        <PlayersTable/>
      </div>

      <Pagination/>
    </div>
  );
}