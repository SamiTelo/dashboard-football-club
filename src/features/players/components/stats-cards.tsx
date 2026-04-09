"use client";

import { StatCard } from "./stat-card";
import { featureIconMap } from "../config/players.config";

const stats = [
  { feature: "Total joueurs", value: "219" },
  { feature: "Total equipes", value: "45" },
  { feature: "Total joueurs actifs", value: "200" },
  { feature: "Total positions", value: "237" },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {stats.map((stat, idx) => {
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