"use client";

import { useState } from "react";
import { useDebounce } from "use-debounce";

import { PlayersTable } from "./components/players-table";
import { PlayersActions } from "./components/players-actions";
import { PlayersFilters } from "./components/players-filters";

import { usePlayersExport } from "./hooks/players-export-pdf";
import { usePlayers } from "./hooks/usePlayers";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { Pagination } from "@/features/dashbaord/components/pagination";
import { Spinner } from "@/components/ui/spinner";

// =========================
// DATE FILTER CONVERTER
// =========================
function getCreatedAtRange(value: string | null) {
  if (!value || value === "all") return undefined;

  const now = new Date();

  switch (value) {
    case "today": {
      const start = new Date();
      start.setHours(0, 0, 0, 0);
      return start.toISOString();
    }

    case "week": {
      const start = new Date();
      start.setDate(now.getDate() - 7);
      return start.toISOString();
    }

    case "month": {
      const start = new Date();
      start.setMonth(now.getMonth() - 1);
      return start.toISOString();
    }

    case "30days": {
      const start = new Date();
      start.setDate(now.getDate() - 30);
      return start.toISOString();
    }

    default:
      return undefined;
  }
}

export default function PlayersList() {
  const { exportPDF } = usePlayersExport();

  // =========================
  // AUTH
  // =========================
  const { user, loading: authLoading } = useAuth(true);

  // =========================
  // STATE
  // =========================
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  // FILTERS
  const [teamId, setTeamId] = useState<number | null>(null);
  const [positionId, setPositionId] = useState<number | null>(null);
  const [createdAt, setCreatedAt] = useState<string | null>(null);

  // SEARCH DEBOUNCE
  const [debouncedSearch] = useDebounce(search, 400);
  const isSearching = debouncedSearch.trim().length > 0;

  // =========================
  // API CALL
  // =========================
  const { data, isLoading } = usePlayers(
    {
      search: debouncedSearch,
      page,
      limit,
      teamId: teamId ?? undefined,
      positionId: positionId ?? undefined,
      createdAt: getCreatedAtRange(createdAt),
    },
    !!user?.id && !authLoading
  );

  const players = data?.data ?? [];

  const emptyMessage = isSearching
    ? `Aucun joueur trouvé pour "${debouncedSearch}"`
    : "Aucun joueur disponible pour le moment";

  // =========================
  // EXPORT
  // =========================
  const handleExport = () => {
    exportPDF(players);
  };

  return (
    <div className="p-0 bg-[#F8F7FA] min-h-screen text-[13px] md:text-[14px] text-[#5d596c]">
      <p className="mt-6">Liste des joueurs /</p>
      <br />

      <div className="bg-white rounded-lg border border-gray-100 min-h-72">

        {/* ========================= */}
        {/* FILTERS */}
        {/* ========================= */}
        <PlayersFilters
          onTeamChange={(value) => {
            setTeamId(value);
            setPage(1);
          }}
          onPositionChange={(value) => {
            setPositionId(value);
            setPage(1);
          }}
          onCreatedAtChange={(value) => {
            setCreatedAt(value);
            setPage(1);
          }}
        />

        {/* ========================= */}
        {/* ACTIONS */}
        {/* ========================= */}
        <PlayersActions
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

        {/* ========================= */}
        {/* TABLE */}
        {/* ========================= */}
        <div className="min-h-52 flex items-center justify-center">
          {authLoading || isLoading ? (
            <Spinner className="h-10 w-10 text-green-500" />
          ) : players.length === 0 ? (
            <p className="text-gray-500 text-center">
              {emptyMessage}
            </p>
          ) : (
            <div className="w-full">
              <PlayersTable players={players} />
            </div>
          )}
        </div>
      </div>

      {/* ========================= */}
      {/* PAGINATION */}
      {/* ========================= */}
      {data && players.length > 0 && (
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