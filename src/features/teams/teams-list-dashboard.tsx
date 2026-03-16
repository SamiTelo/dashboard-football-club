"use client";

import { TeamsTable } from "./components/teams-table";
import { TeamsActions } from "./components/teams-actions";
import { teams } from "./data/teams-data";
import { TeamsExport } from "./hooks/teams-export-pdf";
import { Pagination } from "../dashbaord/components/pagination";


export default function TeamsListDashboard() {

  const { exportPDF } = TeamsExport();

  return (
    <div className="p-0 bg-[#F8F7FA] min-h-screen text-[13px] md:text-[14px] font-sans text-[#5d596c]">

      <p>Liste des équipes /</p>
      <br />

      <div className="bg-white rounded-lg border border-gray-100">

        <TeamsActions onExport={exportPDF} />
        <TeamsTable teams={teams} />

      </div>
       <Pagination/>
    </div>
  );
}