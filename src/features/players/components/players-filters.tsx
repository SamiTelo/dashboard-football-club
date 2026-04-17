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
  onCreatedAtChange?: (value: string | null) => void;
}

export function PlayersFilters({
  onTeamChange,
  onPositionChange,
  onCreatedAtChange,
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

        {/* ===================== */}
        {/* TEAMS */}
        {/* ===================== */}
        <Select onValueChange={(v) => onTeamChange?.(v ? Number(v) : null)}>
          <SelectTrigger className="w-full border border-gray-200 rounded-md p-2 outline-none focus:border-green-300 shadow-none">
            <SelectValue placeholder="Toutes les équipes" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">Toutes les équipes</SelectItem>

            {teamsLoading ? (
              <SelectItem value="loading" disabled>
                Chargement...
              </SelectItem>
            ) : (
              teamsData?.data?.map((team) => (
                <SelectItem key={team.id} value={String(team.id)}>
                  {team.name}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>

        {/* ===================== */}
        {/* POSITIONS */}
        {/* ===================== */}
        <Select onValueChange={(v) => onPositionChange?.(v ? Number(v) : null)}>
          <SelectTrigger className="w-full border border-gray-200 rounded-md p-2 outline-none focus:border-green-300 shadow-none">
            <SelectValue placeholder="Toutes les positions" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">Toutes les positions</SelectItem>

            {positionsLoading ? (
              <SelectItem value="loading" disabled>
                Chargement...
              </SelectItem>
            ) : (
              positionsData?.data?.map((pos) => (
                <SelectItem key={pos.id} value={String(pos.id)}>
                  {pos.name}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>

        {/* ===================== */}
        {/* CREATED AT */}
        {/* ===================== */}
        <Select onValueChange={(v) => onCreatedAtChange?.(v === "all" ? null : v)}>
          <SelectTrigger className="w-full border border-gray-200 rounded-md p-2 outline-none focus:border-green-300 shadow-none">
            <SelectValue placeholder="Toutes les périodes" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">Toutes les périodes</SelectItem>

            <SelectItem value="today">Aujourd’hui</SelectItem>
            <SelectItem value="week">Cette semaine</SelectItem>
            <SelectItem value="month">Ce mois-ci</SelectItem>
            <SelectItem value="30days">30 derniers jours</SelectItem>
          </SelectContent>
        </Select>

      </div>
    </div>
  );
}