"use client";

import { Hand } from "lucide-react";
import React, { ReactNode } from "react";
import {
  FiUsers,
  FiEdit,
  FiTrash2,
  FiMoreVertical,
  FiDownload,
  FiPlus,
} from "react-icons/fi";
import { Pagination } from "./pagination";
import Image from "next/image";
import { GiFootTrip } from "react-icons/gi";
import { GoTrophy } from "react-icons/go";

/* -------------------- TYPES -------------------- */
type Status = "Active" | "Inactive" | "Pending";

interface Players {
  id: number;
  name: string;
  lastname: string;
  team: "Arsenal" | "Fc barcelone" | "Real Madrid" | "PSG" | "Football Club";
  position: "Defenseur" | "Attaquant" | "Milieu" | "Ailier";
  status: Status;
  avatar?: string;
}

interface StatCardProps {
  value: string | number;
  feature: string;
  icon: ReactNode;
  bgColor: string;
  isNegative?: boolean;
}

interface StatusBadgeProps {
  status: Status;
}

/* -------------------- TEAM LOGOS -------------------- */
const teamLogos: Record<Players["team"], string> = {
  Arsenal: "/assets/teams/arsenal.png",
  "Fc barcelone": "/assets/teams/fc-barcelona.png",
  "Real Madrid": "/assets/teams/real-madrid.png",
  PSG: "/assets/teams/psg.png",
  "Football Club": "/assets/logo.png",
};

/* -------------------- MOCK DATA -------------------- */
const players: Players[] = [
  {
    id: 1,
    name: "Jules",
    lastname: "Lucien",
    team: "Football Club",
    position: "Defenseur",
    status: "Active",
  },
  {
    id: 2,
    name: "Lamine",
    lastname: "Yamal",
    team: "Fc barcelone",
    position: "Attaquant",
    status: "Inactive",
  },
  {
    id: 3,
    name: "Devonne ",
    lastname: "Wallbridge",
    team: "Football Club",
    position: "Milieu",
    status: "Active",
  },
];

/* -------------------- FEATURE ICONS & COLORS -------------------- */
const featureIconMap: Record<string, { icon: ReactNode; bgColor: string }> = {
  "Total joueurs": {
    icon: <FiUsers className="text-purple-500" />,
    bgColor: "bg-purple-100",
  },
  "Total equipes": {
    icon: <GoTrophy className="text-red-500" />,
    bgColor: "bg-red-100",
  },
  "Total joueurs actifs": {
    icon: <FiUsers className="text-green-500" />,
    bgColor: "bg-green-100",
  },
  "Total positions": {
    icon: <GiFootTrip className="text-orange-500" />,
    bgColor: "bg-orange-100",
  },
};

const getFeatureIcon = (feature: string) =>
  featureIconMap[feature] || { icon: <FiUsers />, bgColor: "bg-gray-100" };

/* -------------------- COMPONENTS -------------------- */
const StatCard = ({ value, feature, icon, bgColor }: StatCardProps) => (
  <div className="bg-white p-8 rounded-lg shadow-xs flex justify-between items-start border border-gray-100">
    <div>
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-gray-700">{value}</span>
      </div>
      <div className="text-xs text-gray-400 mt-1">{feature}</div>
    </div>
    <div className={`p-5 rounded-lg ${bgColor}`}>{icon}</div>
  </div>
);

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const styles: Record<Status, string> = {
    Active: "bg-green-100 text-green-600",
    Inactive: "bg-gray-100 text-gray-500",
    Pending: "bg-orange-100 text-orange-600",
  };
  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${styles[status]}`}>
      {status}
    </span>
  );
};

/* -------------------- MAIN COMPONENT -------------------- */
export default function DashboardMain() {
  const stats = [
    { feature: "Total joueurs", value: "219" },
    { feature: "Total equipes", value: "45" },
    { feature: "Total joueurs actifs", value: "199,860" },
    { feature: "Total positions", value: "237" },
  ];

  return (
    <div className="p-0 bg-[#F8F7FA] min-h-screen text-[13px] md:text-[14px] font-sans text-[#5d596c]">
      {/* Title */}
      <p>Tableau de bord /</p>
      <br />

      {/* Hero */}
      <div className="bg-green-100 py-4 px-4 sm:px-6 mb-6 rounded-xl">
        <p className="flex items-start sm:items-center gap-2 text-sm sm:text-base md:text-[14px] leading-relaxed">
          <Hand className="text-green-500 mt-1 sm:mt-0 shrink-0" />
          <span>
            Bonjour <strong>Samuel TIEMTORE</strong>, bienvenue sur
            <span className="text-green-500 font-semibold ml-1">
              Football Club
            </span>
          </span>
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, idx) => {
          const { icon, bgColor } = getFeatureIcon(stat.feature);
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

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow-xs border border-gray-100">
        {/* Filters */}
        <div className="p-5 border-b border-gray-100">
          <h3 className="text-lg font-medium mb-4">Search Filter</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select className="border border-gray-200 rounded-md p-2 outline-none focus:border-green-300">
              <option>Select Equipe</option>
            </select>
            <select className="border border-gray-200 rounded-md p-2 outline-none focus:border-green-300">
              <option>Select Position</option>
            </select>
            <select className="border border-gray-200 rounded-md p-2 outline-none focus:border-green-300">
              <option>Select Status</option>
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <select className="border border-gray-200 rounded-md p-1">
            <option>10</option>
          </select>
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-200 rounded-md py-2 px-3 focus:outline-none focus:border-green-300"
            />
            <button className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-200 transition">
              <FiDownload /> Exporter
            </button>
            <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-green-400 transition shadow-md shadow-indigo-200">
              <FiPlus /> Ajouter un joueur
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#F8F7FA] uppercase text-xs font-semibold text-gray-500 border-y border-gray-100">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Joueurs</th>
                <th className="px-6 py-3">Equipe</th>
                <th className="px-6 py-3">Positions</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {players.map((player) => {
                const initials = player.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("");
                return (
                  <tr key={player.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                        #{player.id}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
                        {initials}
                      </div>
                      <div className="flex flex-row gap-1">
                        <div className="font-medium text-gray-800">
                          {player.name}
                        </div>
                        <div className="font-medium text-gray-800">
                          {player.lastname}
                        </div>
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 min-w-35">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 overflow-hidden rounded-full shrink-0">
                          <Image
                            src={teamLogos[player.team]}
                            alt={player.team}
                            width={24}
                            height={24}
                            className="object-cover"
                          />
                        </span>
                        <span className="truncate">{player.team}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium">{player.position}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={player.status} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2 text-gray-400">
                        <FiEdit className="cursor-pointer hover:text-indigo-500" />
                        <FiTrash2 className="cursor-pointer hover:text-red-500" />
                        <FiMoreVertical className="cursor-pointer hover:text-gray-700" />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination />
    </div>
  );
}
