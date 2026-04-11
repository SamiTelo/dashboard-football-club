"use client";

import React from "react";
import { FiMoreVertical } from "react-icons/fi";
import { PopUpdatePositions } from "./pop-udpdate-positions";
import { PopDeletePositions } from "./pop-alert-delete";
import { Position } from "../types/positions-types";

interface PositionsRowProps {
  position: Position;
}

export const PositionRow = ({ position }: PositionsRowProps) => {
  return (
    <tr className="hover:bg-gray-50 transition">
      <td className="px-6 py-4">
        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
          #{position.id}
        </span>
      </td>
      
      {/* POSITIONS */}
      <td className="px-6 py-4 text-gray-500">
        {position.name}
      </td>

      {/* ACTIONS */}
      <td className="px-6 py-4">
        <div className="flex justify-center gap-2 text-gray-400">
          <PopUpdatePositions position={position} />
          <PopDeletePositions id={position.id} />
          <FiMoreVertical className="cursor-pointer hover:text-gray-700" />
        </div>
      </td>
    </tr>
  );
};