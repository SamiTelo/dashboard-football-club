"use client";

import { useTeams } from "@/features/teams/hooks/useTeams";
import { usePositions } from "@/features/positions/hooks/usePositions";
import { RotateCcw } from "lucide-react";

interface PlayersFiltersProps {
  onTeamChange?: (value: number | null) => void;
  onPositionChange?: (value: number | null) => void;

  // état actuel des filtres
  team?: number | null;
  position?: number | null;
}

export function PlayersFilters({
  onTeamChange,
  onPositionChange,
  team,
  position,
}: PlayersFiltersProps) {
  const { data: teamsData, isLoading: teamsLoading } = useTeams({
    page: 1,
    limit: 100,
  });

  const { data: positionsData, isLoading: positionsLoading } = usePositions({
    page: 1,
    limit: 100,
  });

  const handleReset = () => {
    onTeamChange?.(null);
    onPositionChange?.(null);
  };

  const isReset = !team && !position;

  return (
    <div className="p-5 border-b border-gray-100">
      <h3 className="text-lg font-medium mb-4">Search Filter</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* TEAMS */}
        <select
          value={team ?? ""}
          onChange={(e) =>
            onTeamChange?.(e.target.value ? Number(e.target.value) : null)
          }
          className="w-full border border-gray-200 rounded-md p-2 outline-none focus:border-green-300 shadow-none"
        >
          <option value="">Choisir une équipe</option>

          {teamsLoading ? (
            <option disabled>Chargement...</option>
          ) : (
            teamsData?.data?.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))
          )}
        </select>

        {/* POSITIONS */}
        <select
          value={position ?? ""}
          onChange={(e) =>
            onPositionChange?.(
              e.target.value ? Number(e.target.value) : null
            )
          }
          className="w-full border border-gray-200 rounded-md p-2 outline-none focus:border-green-300 shadow-none"
        >
          <option value="">Choisir une position</option>

          {positionsLoading ? (
            <option disabled>Chargement...</option>
          ) : (
            positionsData?.data?.map((pos) => (
              <option key={pos.id} value={pos.id}>
                {pos.name}
              </option>
            ))
          )}
        </select>

        {/* RESET BUTTON */}
        <button
          onClick={handleReset}
          disabled={isReset}
          className="
            w-full border border-gray-200 rounded-md p-2 text-left bg-white
            hover:bg-gray-50 focus:border-green-300 outline-none transition
            flex items-center justify-between group
            cursor-pointer
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          <span>Toutes les listes de joueurs</span>

          <RotateCcw
            className={`
              w-4 h-4 text-gray-500 transition
              group-hover:text-green-500
              ${isReset ? "opacity-40" : ""}
            `}
          />
        </button>
      </div>
    </div>
  );
}