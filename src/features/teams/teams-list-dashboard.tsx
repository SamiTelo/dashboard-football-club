"use client";

import { useState } from "react";
import { useDebounce } from "use-debounce";

import { TeamsTable } from "./components/teams-table";
import { TeamsActions } from "./components/teams-actions";
import { TeamsExport } from "./hooks/teams-export-pdf";
import { useTeams } from "./hooks/useTeams";
import { Pagination } from "../dashbaord/components/pagination";

export default function TeamsListDashboard() {
  const { exportPDF } = TeamsExport();

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
  // API
  // =========================
  const { data, isLoading } = useTeams({
    search: debouncedSearch,
    page,
    limit,
  });

  // =========================
  // EXPORT HANDLER 
  // =========================
  const handleExport = () => {
    exportPDF(data?.data ?? []);
  };

  return (
    <div className="p-0 bg-[#F8F7FA] min-h-screen text-[13px] md:text-[14px] font-sans text-[#5d596c]">

      <p>Liste des équipes /</p>
      <br />

      <div className="bg-white rounded-lg border border-gray-100">

        {/* ACTIONS */}
        <TeamsActions
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
          <TeamsTable teams={data?.data ?? []} />
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