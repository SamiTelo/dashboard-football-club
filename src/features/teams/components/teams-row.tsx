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
      <td className="px-6 py-4">
        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
          #{team.id}
        </span>
      </td>

      {/* TEAM INFO */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">

          <Image
            src={team.logoUrl || "/placeholder-team.png"}
            alt={team.name}
            width={32}
            height={32}
            className="rounded-full object-cover"
          />

          <div className="flex flex-col">
            <span className="font-medium text-gray-700">
              {team.name}
            </span>
          </div>

        </div>
      </td>

      {/* COUNTRY */}
      <td className="px-6 py-4">
        <span className="text-sm text-gray-500">
          {team.country ?? "—"}
        </span>
      </td>

      {/* ACTIONS */}
      <td className="px-6 py-4">
        <div className="flex justify-center gap-2 text-gray-400">

          <PopUpdateTeam team={team} />

          <PopDeleteTeam teamId={team.id} />

          <FiMoreVertical className="cursor-pointer hover:text-gray-700" />

        </div>
      </td>

    </tr>
  );
}