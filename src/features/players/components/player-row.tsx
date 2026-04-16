"use client";

import Image from "next/image";
import { FiMoreVertical } from "react-icons/fi";

import { Player } from "../types/players-types";
import { PopDeletePlayer } from "./pop-delete-player";
import { PopUpdatePlayer } from "./pop-update-player";

const avatarColors = [
  "bg-blue-100 text-blue-600",
  "bg-green-100 text-green-600",
  "bg-purple-100 text-purple-600",
];

function getAvatarColor(id: number) {
  return avatarColors[id % avatarColors.length];
}

function formatDate(date?: string | Date) {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function PlayerRow({ player }: { player: Player }) {
  const initials = (player.firstName?.[0] ?? "") + (player.lastName?.[0] ?? "");

  const hasImage = !!player.imageUrl;

  return (
    <tr className="hover:bg-gray-50 transition">
      {/* ID */}
      <td className="px-3 py-3 sm:px-6 sm:py-4">
        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
          #{player.id}
        </span>
      </td>

      {/* PLAYER */}
      <td className="px-3 py-3 sm:px-6 sm:py-4 flex items-center gap-3 min-w-0">
        <div
          className={`w-10 aspect-square shrink-0 rounded-full overflow-hidden flex items-center justify-center font-bold ${getAvatarColor(
            player.id,
          )}`}
        >
          {hasImage ? (
            <div className="relative w-full h-full">
              <Image
                src={player.imageUrl || "/placeholder-team.png"}
                alt={`${player.firstName} ${player.lastName}`}
                fill
                className="rounded-full object-cover"
              />
            </div>
          ) : (
            <span>{initials}</span>
          )}
        </div>

        <div className="font-medium text-gray-800 truncate">
          {player.firstName} {player.lastName}
        </div>
      </td>

      {/* TEAM */}
      <td className="px-3 py-3 sm:px-6 sm:py-4">
        <div className="flex items-center gap-2 min-w-0">
          {player.team?.logoUrl && (
            <Image
              src={player.team.logoUrl}
              alt={player.team.name}
              width={24}
              height={24}
              className="rounded-full shrink-0"
            />
          )}
          <span className="truncate">{player.team?.name ?? "—"}</span>
        </div>
      </td>

      {/* POSITION */}
      <td className="px-3 py-3 sm:px-6 sm:py-4">
        {player.position?.name ?? "—"}
      </td>

      {/* CREATED */}
      <td className="px-3 py-3 sm:px-6 sm:py-4 text-sm text-gray-500">
        {formatDate(player.createdAt)}
      </td>

      {/* UPDATED */}
      <td className="px-3 py-3 sm:px-6 sm:py-4 text-sm text-gray-500">
        {formatDate(player.updatedAt)}
      </td>

      {/* ACTIONS */}
      <td className="px-3 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
        <div className="flex justify-center gap-2 text-gray-400">
          <PopUpdatePlayer player={player} />
          <PopDeletePlayer playerId={player.id} />
          <FiMoreVertical className="cursor-pointer hover:text-gray-700" />
        </div>
      </td>
    </tr>
  );
}
