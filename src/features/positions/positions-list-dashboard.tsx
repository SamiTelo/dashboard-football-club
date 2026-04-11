"use client";

import React, { useState } from "react";
import { useDebounce } from "use-debounce";

import { PositionsTable } from "./components/positions-table";
import { PositionsActions } from "./components/positions-actions";
import { PositionsExport } from "./hooks/position-export-pdf";
import { usePositions } from "./hooks/usePositions";
import { Pagination } from "../dashbaord/components/pagination";

export default function PositionsListDashboard() {
  const { exportPDF } = PositionsExport();

  // =========================
  // STATE
  // =========================
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  // =========================
  // DEBOUNCE SEARCH
  // =========================
  const [debouncedSearch] = useDebounce(search, 400);

  // =========================
  // API CALL
  // =========================
  const { data, isLoading } = usePositions({
    search: debouncedSearch,
    limit,
    page,
  });

  // =========================
  // EXPORT HANDLER 
  // =========================
  const handleExport = () => {
    exportPDF(data?.data ?? []);
  };

  return (
    <div className="p-0 bg-[#F8F7FA] min-h-screen text-[13px] md:text-[14px] font-sans text-[#5d596c]">
      <p>Liste des postes /</p>
      <br />

      <div className="bg-white rounded-lg border border-gray-100">
        {/* ACTIONS */}
        <PositionsActions
          onExport={handleExport}
          search={search}
          onSearchChange={(value) => {
            setSearch(value);
            setPage(1); // reset pagination
          }}
          limit={limit}
          onLimitChange={(value) => {
            setLimit(value);
            setPage(1);
          }}
        />

        {/* TABLE */}
        {isLoading ? (
          <p className="p-4">Chargement...</p>
        ) : (
          <PositionsTable positions={data?.data ?? []} />
        )}
      </div>

      {/* PAGINATION */}
      {data && (
        <Pagination
          page={page}
          limit={limit}
          total={data.meta.total}
          totalPages={data.meta.totalPages}
          onPageChange={(p) => setPage(p)}
        />
      )}
    </div>
  );
}