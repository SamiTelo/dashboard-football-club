"use client";

import Image from "next/image";
import { FiEdit, FiTrash2, FiMoreVertical } from "react-icons/fi";
import { Player } from "../types/players.types";
import { StatusBadge } from "./status-badge";
import { teamLogos } from "../config/players.config";

export function PlayerRow({ player }: { player: Player }) {
  const initials = player.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <tr className="hover:bg-gray-50 transition">
      <td className="px-6 py-4">
        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
          #{player.id}
        </span>
      </td>
      <td className="px-6 py-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
          {initials}
        </div>
        <div className="flex flex-row gap-1">
          <div className="font-medium text-gray-800">{player.name}</div>
          <div className="font-medium text-gray-800">{player.lastname}</div>
        </div>
      </td>
      <td className="px-3 sm:px-6 py-4 min-w-35">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 overflow-hidden rounded-full shrink-0">
            <Image
              src={teamLogos[player.team]}
              alt={player.team}
              width={24}
              height={24}
              className="object-cover"
            />
          </span>
          <span className="truncate">{player.team}</span>
        </div>
      </td>
      <td className="px-6 py-4 font-medium">{player.position}</td>
      <td className="px-6 py-4">
        <StatusBadge status={player.status} />
      </td>
      <td className="px-6 py-4">
        <div className="flex justify-center gap-2 text-gray-400">
          <FiEdit className="cursor-pointer hover:text-indigo-500" />
          <FiTrash2 className="cursor-pointer hover:text-red-500" />
          <FiMoreVertical className="cursor-pointer hover:text-gray-700" />
        </div>
      </td>
    </tr>
  );
}
