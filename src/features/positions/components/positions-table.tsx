"use client";

import React from "react";
import { PositionsListItem } from "../types/positions-types";
import { PositionRow } from "./positions-row";

interface PositionsTableProps {
  position: PositionsListItem[]; // ← tableau
}

export const PositionsTable = ({ position }: PositionsTableProps) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left border-collapse">
      <thead className="bg-[#F8F7FA] uppercase text-xs font-semibold text-gray-500 border-y border-gray-100">
        <tr>
          <th className="px-6 py-3">ID</th>
          <th className="px-6 py-3">Positions</th>
          <th className="px-6 py-3 text-center">Actions</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-100">
        {position.length === 0 ? (
          <tr>
            <td colSpan={8} className="text-center py-6 text-gray-400">
              Aucun poste pour le moment
            </td>
          </tr>
        ) : (
          position.map((position) => (
            <PositionRow key={position.id} position={position} />
          ))
        )}
      </tbody>
    </table>
  </div>
);
