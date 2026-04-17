"use client";

import { useState } from "react";
import { useDebounce } from "use-debounce";

import { Pagination } from "@/features/dashbaord/components/pagination";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { Spinner } from "@/components/ui/spinner";
import { PlayersActions } from "./players-actions";
import { PlayersTable } from "./players-table";
import { usePlayers } from "../hooks/usePlayers";

export function PlayersPreview() {
  const { user, loading: authLoading } = useAuth(true);

  // =========================
  // STATE
  // =========================
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [debouncedSearch] = useDebounce(search, 300);

  // =========================
  // API
  // =========================
  const { data, isLoading } = usePlayers(
    {
      search: debouncedSearch,
      page,
      limit: 5, // preview limité
    },
    !!user?.id && !authLoading
  );

  const players = data?.data ?? [];

  return (
    <div className="p-0">

      {/* ========================= */}
      {/* SEARCH ONLY */}
      {/* ========================= */}
      <PlayersActions
        search={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        limit={5}
        onLimitChange={() => {}}
        onExport={() => {}}
      />

      {/* ========================= */}
      {/* TABLE */}
      {/* ========================= */}
      <div className="min-h-52 flex items-center justify-center">
        {authLoading || isLoading ? (
          <Spinner className="h-10 w-10 text-green-500" />
        ) : players.length === 0 ? (
          <p className="text-gray-500 text-center">
            Aucun joueur
          </p>
        ) : (
          <div className="w-full">
            <PlayersTable players={players} />
          </div>
        )}
      </div>

      {/* ========================= */}
      {/* PAGINATION */}
      {/* ========================= */}
      {data && players.length > 0 && (
        <Pagination
          page={page}
          limit={5}
          total={data.total}
          totalPages={data.totalPages}
          onPageChange={(p) => setPage(p)}
        />
      )}

    </div>
  );
}