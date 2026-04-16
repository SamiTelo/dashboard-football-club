"use client";

import Image from "next/image";
import { FiMoreVertical } from "react-icons/fi";

import { Player } from "../types/players-types";
import { PopUpdatePlayer } from "./pop-update-player";
import { PopDeletePlayer } from "./pop-delete-player";

// =========================
// AVATAR COLORS
// =========================
const avatarColors = [
  "bg-blue-100 text-blue-600",
  "bg-green-100 text-green-600",
  "bg-purple-100 text-purple-600",
];

function getAvatarColor(id: number) {
  return avatarColors[id % avatarColors.length];
}

export function PlayerRow({ player }: { player: Player }) {
  const initials =
    (player.firstName?.[0] ?? "") +
    (player.lastName?.[0] ?? "");

  const hasImage = !!player.imageUrl;

  return (
    <tr className="hover:bg-gray-50 transition">

      {/* ID */}
      <td className="px-6 py-4">
        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
          #{player.id}
        </span>
      </td>

      {/* NAME + AVATAR */}
      <td className="px-6 py-4 flex items-center gap-3">

        {/* AVATAR */}
        <div
          className={`w-10 h-10 rounded-full overflow-hidden flex items-center justify-center font-bold ${getAvatarColor(
            player.id
          )}`}
        >
          {hasImage ? (
            <Image
              src={player.imageUrl as string}
              alt={`${player.firstName} ${player.lastName}`}
              width={40}
              height={40}
              className="object-cover w-full h-full"
            />
          ) : (
            <span>{initials}</span>
          )}
        </div>

        {/* NAME */}
        <div className="font-medium text-gray-800">
          {player.firstName} {player.lastName}
        </div>
      </td>

      {/* TEAM */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          {player.team?.logoUrl && (
            <Image
              src={player.team.logoUrl}
              alt={player.team.name}
              width={24}
              height={24}
              className="rounded-full"
            />
          )}
          <span>{player.team?.name ?? "—"}</span>
        </div>
      </td>

      {/* POSITION */}
      <td className="px-6 py-4">
        {player.position?.name ?? "—"}
      </td>

      {/* ACTIONS */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex justify-center gap-2 text-gray-400">
          <PopUpdatePlayer player={player} />
          <PopDeletePlayer playerId={player.id} />
          <FiMoreVertical className="cursor-pointer hover:text-gray-700" />
        </div>
      </td>
    </tr>
  );
}