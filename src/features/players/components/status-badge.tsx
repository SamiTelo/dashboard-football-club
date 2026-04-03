"use client";

import { Status } from "../types/players.types";

export function StatusBadge({ status }: { status: Status }) {
  const styles = {
    Active: "bg-green-100 text-green-600",
    Inactive: "bg-gray-100 text-gray-500",
    Pending: "bg-orange-100 text-orange-600",
  };

  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${styles[status]}`}>
      {status}
    </span>
  );
}