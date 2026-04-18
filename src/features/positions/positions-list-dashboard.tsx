"use client";

import { useState } from "react";
import { useDebounce } from "use-debounce";

import { PositionsTable } from "./components/positions-table";
import { PositionsActions } from "./components/positions-actions";
import { PositionsExport } from "./hooks/usePositionExportPdf";
import { usePositions } from "./hooks/usePositions";
import { Pagination } from "../dashbaord/components/pagination";
import { Spinner } from "@/components/ui/spinner";

export default function PositionsListDashboard() {
  const { exportPDF } = PositionsExport();

  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const [debouncedSearch] = useDebounce(search, 400);
  const isSearching = debouncedSearch.trim().length > 0;

  const { data, isLoading } = usePositions({
    search: debouncedSearch,
    page,
    limit,
  });

  const positions = data?.data ?? [];

  const emptyMessage = isSearching
    ? `Aucun poste trouvé pour "${debouncedSearch}"`
    : "Aucun poste disponible pour le moment";

  const handleExport = () => {
    exportPDF(positions);
  };

  return (
    <div className="p-0 bg-[#F8F7FA] min-h-screen text-[13px] md:text-[14px] text-[#5d596c]">
      <p className="mt-6">Liste des postes /</p>
      <br />

      <div className="bg-white rounded-lg border border-gray-100 min-h-72">
        <PositionsActions
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

        <div className="min-h-52 flex items-center justify-center">
          {isLoading ? (
            <Spinner className="h-10 w-10 text-green-500" />
          ) : positions.length === 0 ? (
            <p className="text-gray-500 text-center">
              {emptyMessage}
            </p>
          ) : (
            <div className="w-full">
              <PositionsTable positions={positions} />
            </div>
          )}
        </div>
      </div>

      {data && positions.length > 0 && (
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