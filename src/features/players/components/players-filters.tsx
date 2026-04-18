"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useTeams } from "@/features/teams/hooks/useTeams";
import { usePositions } from "@/features/positions/hooks/usePositions";

interface PlayersFiltersProps {
  onTeamChange?: (value: number | null) => void;
  onPositionChange?: (value: number | null) => void;
}

export function PlayersFilters({
  onTeamChange,
  onPositionChange,
}: PlayersFiltersProps) {
  const { data: teamsData, isLoading: teamsLoading } = useTeams({
    page: 1,
    limit: 100,
  });

  const { data: positionsData, isLoading: positionsLoading } = usePositions({
    page: 1,
    limit: 100,
  });

  return (
    <div className="p-5 border-b border-gray-100">
      <h3 className="text-lg font-medium mb-4">Search Filter</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* TEAMS */}
        <Select onValueChange={(v) => onTeamChange?.(v ? Number(v) : null)}>
          <SelectTrigger className="w-full border border-gray-200 rounded-md p-2 outline-none focus:border-green-300 shadow-none">
            <SelectValue placeholder="Choisir une équipe" />
          </SelectTrigger>

          <SelectContent>
            {teamsLoading ? (
              <SelectItem value="loading" disabled>
                Chargement...
              </SelectItem>
            ) : teamsData?.data?.length ? (
              teamsData.data.map((team) => (
                <SelectItem key={team.id} value={String(team.id)}>
                  {team.name}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="empty" disabled>
                Aucune équipe
              </SelectItem>
            )}
          </SelectContent>
        </Select>

        {/* POSITIONS */}
        <Select onValueChange={(v) => onPositionChange?.(v ? Number(v) : null)}>
          <SelectTrigger className="w-full border border-gray-200 rounded-md p-2 outline-none focus:border-green-300 shadow-none">
            <SelectValue placeholder="Choisir une position" />
          </SelectTrigger>

          <SelectContent>
            {positionsLoading ? (
              <SelectItem value="loading" disabled>
                Chargement...
              </SelectItem>
            ) : positionsData?.data?.length ? (
              positionsData.data.map((pos) => (
                <SelectItem key={pos.id} value={String(pos.id)}>
                  {pos.name}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="empty" disabled>
                Aucune position
              </SelectItem>
            )}
          </SelectContent>
        </Select>

        {/* ALL LISTES */}
        <Select
          onValueChange={(v) => {
            if (v === "all") {
              onTeamChange?.(null);
              onPositionChange?.(null);
            }
          }}
        >
          <SelectTrigger className="w-full border border-gray-200 rounded-md p-2 outline-none focus:border-green-300 shadow-none">
            <SelectValue placeholder="Toutes la listes" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">Toutes la liste des joueur</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
