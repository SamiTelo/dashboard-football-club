"use client";

import { Position } from "../types/positions-types";
import { PositionRow } from "./positions-row";

interface PositionsTableProps {
  positions: Position[];
}

export const PositionsTable = ({ positions }: PositionsTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="bg-[#F8F7FA] uppercase text-xs font-semibold text-gray-500 border-y border-gray-100">
          <tr>
            <th className="px-6 py-3">ID</th>
            <th className="px-6 py-3">Poste</th>
            <th className="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {positions.map((position) => (
            <PositionRow key={position.id} position={position} />
          ))}
        </tbody>
      </table>
    </div>
  );
};