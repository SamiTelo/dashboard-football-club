"use client";

import { StatCard } from "./stat-card";
import { featureIconMap } from "../config/stats-card.config";
import { useDashboardStats } from "../hooks/useDashboardStats";

export function StatsCards() {
  const { stats, loading } = useDashboardStats();

  const formattedStats = [
    {
      feature: "Total joueurs",
      value: loading ? "..." : stats?.players ?? 0,
    },
    {
      feature: "Total equipes",
      value: loading ? "..." : stats?.teams ?? 0,
    },
    {
      feature: "Total joueurs actifs",
      value: loading ? "..." : stats?.players ?? 0,
    },
    {
      feature: "Total positions",
      value: loading ? "..." : stats?.positions ?? 0,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {formattedStats.map((stat, idx) => {
        const { icon, bgColor } = featureIconMap[stat.feature];

        return (
          <StatCard
            key={idx}
            value={stat.value}
            feature={stat.feature}
            icon={icon}
            bgColor={bgColor}
          />
        );
      })}
    </div>
  );
}