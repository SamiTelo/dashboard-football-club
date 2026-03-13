"use client";
import React from "react";
import { UserStatus } from "../types/users.types";

interface StatusBadgeProps {
  status: UserStatus;
}

const styles: Record<UserStatus, string> = {
  Active: "bg-green-100 text-green-600",
  Inactive: "bg-gray-100 text-gray-500",
};

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${styles[status]}`}>
      {status}
    </span>
  );
};
