"use client";

import React from "react";
import { PositionsTable } from "./components/positions-table";
import { position } from "./data/positions-data";
import { PositionsActions } from "./components/positions-actions";
import { PositionsExport } from "./hooks/position-export-pdf";



export default function PositionsListDashboard() {
    const { exportPDF } = PositionsExport(); 
  return (
    <div className="p-0 bg-[#F8F7FA] min-h-screen text-[13px] md:text-[14px] font-sans text-[#5d596c]">
      
      <p>Liste des postes /</p>
      <br />

      <div className="bg-white rounded-lg border border-gray-100">
        <PositionsActions onExport={exportPDF} />
        <PositionsTable position={position} /> 
      </div>
    </div>
  );
}