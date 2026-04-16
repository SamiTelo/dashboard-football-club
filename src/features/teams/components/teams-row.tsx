"use client";

import Image from "next/image";
import { FiMoreVertical } from "react-icons/fi";
import { PopDeleteTeam } from "./pop-delete-team";
import { PopUpdateTeam } from "./pop-update-team";
import { Team } from "../types/teams-types";

interface TeamsRowProps {
  team: Team;
}

export function TeamsRow({ team }: TeamsRowProps) {
  return (
    <tr className="hover:bg-gray-50 transition">
      {/* ID */}
      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
          #{team.id}
        </span>
      </td>

      {/* TEAM INFO (AMÉLIORÉ) */}
      <td className="px-3 sm:px-6 py-4">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {/* IMAGE WRAPPER FIXE */}
          <div className="relative w-7 h-7 sm:w-8 sm:h-8 shrink-0">
            <Image
              src={team.logoUrl || "/placeholder-team.png"}
              alt={team.name}
              fill
              className="rounded-full object-cover"
            />
          </div>

          {/* NAME */}
          <div className="flex flex-col min-w-0">
            <span className="text-xs sm:text-sm text-gray-500 truncate">
              {team.name}
            </span>
          </div>
        </div>
      </td>

      {/* COUNTRY */}
      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
        <span className="text-xs sm:text-sm text-gray-500 truncate">
          {team.country ?? "—"}
        </span>
      </td>

      {/* ACTIONS */}
      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
        <div className="flex justify-center gap-2 text-gray-400">
          <PopUpdateTeam team={team} />

          <PopDeleteTeam teamId={team.id} />

          <FiMoreVertical className="cursor-pointer hover:text-gray-700" />
        </div>
      </td>
    </tr>
  );
}
