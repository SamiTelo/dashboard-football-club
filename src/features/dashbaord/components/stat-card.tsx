"use client";

import { ReactNode } from "react";

interface Props {
  value: string | number;
  feature: string;
  icon: ReactNode;
  bgColor: string;
}

export function StatCard({ value, feature, icon, bgColor }: Props) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-xs flex justify-between border border-gray-100">
      <div>
        <span className="text-2xl font-bold text-gray-700">{value}</span>
        <div className="text-xs text-gray-400 mt-1">{feature}</div>
      </div>

      <div className={`p-5 rounded-lg ${bgColor}`}>{icon}</div>
    </div>
  );
}