"use client";

import { FiDownload } from "react-icons/fi";
import { PopAddPlayers } from "./pop-add-players";

interface PlayersActionsProps {
  onExport: () => void;

  search: string;
  onSearchChange: (value: string) => void;

  limit: number;
  onLimitChange: (value: number) => void;
}

export function PlayersActions({
  onExport,
  search,
  onSearchChange,
  limit,
  onLimitChange,
}: PlayersActionsProps) {
  return (
    <div className="p-4 flex flex-col md:flex-row justify-between items-center gap-4">
      
      {/* LIMIT */}
      <select
        className="border border-gray-200 rounded-md p-1"
        value={limit}
        onChange={(e) => onLimitChange(Number(e.target.value))}
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>

      <div className="flex flex-wrap items-center gap-3">
        
        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="border border-gray-200 rounded-md py-2 px-3 focus:outline-none focus:border-green-300"
        />

        {/* EXPORT */}
        <button
          onClick={onExport}
          className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-200 transition"
        >
          <FiDownload /> Exporter
        </button>

        {/* CREATE */}
        <PopAddPlayers />
      </div>
    </div>
  );
}