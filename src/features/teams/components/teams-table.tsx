"use client";

import { TeamsListItem } from "../types/teams-types";
import { TeamsRow } from "./teams-row";

interface TeamsTableProps {
  teams: TeamsListItem[];
}

export function TeamsTable({ teams }: TeamsTableProps) {
  return (
    <div className="overflow-x-auto">

      <table className="w-full text-left border-collapse">

        <thead className="bg-[#F8F7FA] uppercase text-xs font-semibold text-gray-500 border-y border-gray-100">
          <tr>
            <th className="px-6 py-3">ID</th>
            <th className="px-6 py-3">Teams</th>
            <th className="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">

          {teams.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center py-6 text-gray-400">
                Aucune équipe
              </td>
            </tr>
          ) : (
            teams.map((team) => (
              <TeamsRow key={team.id} team={team} />
            ))
          )}

        </tbody>

      </table>

    </div>
  );
}