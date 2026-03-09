"use client";

import { SidebarGroup } from "./ui/sidebar";
import { Trophy } from "lucide-react";

export function NavInfo() {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <div className="relative mt-3 overflow-hidden rounded-xl h-40 shadow-lg text-white">
        {/* Background image */}
        <div className="absolute inset-0 bg-[url('/assets/info-img.png')] bg-cover bg-center" />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/56" />

        {/* Content */}
        <div className="relative p-4">
          {/* Header */}
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="w-5 h-5" />
            <span className="text-sm font-semibold">Football Manager</span>
          </div>

          {/* Description */}
          <p className="text-xs opacity-90 mb-3">
            Gérez vos équipes, joueurs et matchs facilement depuis votre
            dashboard.
          </p>

          {/* Button */}
          <button className="w-full text-xs bg-white/30 hover:bg-white/30 transition rounded-md py-1.5">
            Voir le calendrier
          </button>
        </div>
      </div>
    </SidebarGroup>
  );
}
