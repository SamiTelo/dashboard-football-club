"use client";
import React from "react";

interface VerifiedBadgeProps {
  isVerified: boolean;
}

export const VerifiedBadge = ({ isVerified }: VerifiedBadgeProps) => {
  const styles = isVerified
    ? "bg-green-100 text-green-600"
    : "bg-gray-100 text-gray-500";

  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${styles}`}>
      {isVerified ? "Verified" : "Unverified"}
    </span>
  );
};
