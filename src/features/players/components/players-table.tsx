"use client";

import { players } from "../data/players.data";
import { PlayerRow } from "./player-row";

export function PlayersTable() {
  return (
   <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#F8F7FA] uppercase text-xs font-semibold text-gray-500 border-y border-gray-100">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Joueurs</th>
                <th className="px-6 py-3">Equipe</th>
                <th className="px-6 py-3">Positions</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>

        <tbody  className="divide-y divide-gray-100">
          {players.map((player) => (
            <PlayerRow key={player.id} player={player} />
          ))}
        </tbody>
      </table>
    </div>
  );
}