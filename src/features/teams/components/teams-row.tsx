"use client";

import Image from "next/image";
import { TeamsListItem } from "../types/teams-types";
import { FiMoreVertical } from "react-icons/fi";
import { PopDeleteTeam } from "./pop-delete-team";
import { PopUpdateTeam } from "./pop-update-team";

interface TeamsRowProps {
  team: TeamsListItem;
}

export function TeamsRow({ team }: TeamsRowProps) {
  return (
    <tr className="hover:bg-gray-50 transition">
      
      <td className="px-6 py-4">
        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
          #{team.id}
        </span>
      </td>

      <td className="px-6 py-4 flex items-center gap-3">

        <Image
          src={team.imageurl}
          alt={team.name}
          width={32}
          height={32}
          className="rounded-full"
        />

        <span className="font-medium text-gray-700">
          {team.name}
        </span>

      </td>

      <td className="px-6 py-4">
        <div className="flex justify-center gap-2 text-gray-400">

          <PopUpdateTeam />
          <PopDeleteTeam />
          <FiMoreVertical className="cursor-pointer hover:text-gray-700" />

        </div>
      </td>

    </tr>
  );
}