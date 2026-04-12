"use client";

import { useState } from "react";
import { useDebounce } from "use-debounce";

import { TeamsTable } from "./components/teams-table";
import { TeamsActions } from "./components/teams-actions";
import { TeamsExport } from "./hooks/teams-export-pdf";
import { useTeams } from "./hooks/useTeams";
import { Pagination } from "../dashbaord/components/pagination";
import { Spinner } from "@/components/ui/spinner";

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

  const teams = data?.data ?? [];
  const isEmpty = !isLoading && teams.length === 0;

  // =========================
  // EXPORT
  // =========================
  const handleExport = () => {
    exportPDF(teams);
  };

  return (
    <div className="p-0 bg-[#F8F7FA] min-h-screen text-[13px] md:text-[14px] text-[#5d596c]">
      <p>Liste des équipes /</p>
      <br />

      <div className="bg-white rounded-lg border border-gray-100 min-h-72">
        {/* ACTIONS */}
        <TeamsActions
          onExport={handleExport}
          search={search}
          onSearchChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
          limit={limit}
          onLimitChange={(value) => {
            setLimit(value);
            setPage(1);
          }}
        />

        {/* =========================
            TABLE STATES (PRO UX)
        ========================= */}
        <div className="min-h-52 flex items-center justify-center">
          {isLoading ? (
            <Spinner className="h-10 w-10 text-green-500" />
          ) : isEmpty ? (
            <p className="text-gray-500">
              Aucune équipe disponible pour le moment
            </p>
          ) : (
            <div className="w-full">
              <TeamsTable teams={teams} />
            </div>
          )}
        </div>
      </div>

      {/* PAGINATION */}
      {data && teams.length > 0 && (
        <Pagination
          page={page}
          limit={limit}
          total={data.total}
          totalPages={data.totalPages}
          onPageChange={(p) => setPage(p)}
        />
      )}
    </div>
  );
}