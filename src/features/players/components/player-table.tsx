"use client";

import { UsersPagination } from "@/features/users/components/users-pagination";
import React, { ReactNode } from "react";
import {
  FiUsers,
  FiUserCheck,
  FiUserPlus,
  FiUserX,
  FiEdit,
  FiTrash2,
  FiMoreVertical,
  FiDownload,
  FiPlus,
} from "react-icons/fi";

/* -------------------- TYPES -------------------- */

type Status = "Active" | "Inactive" | "Pending";

interface User {
  id: number;
  name: string;
  email: string;
  role: "Maintainer" | "Subscriber" | "Editor" | "Author" | "Admin";
  plan: "Enterprise" | "Basic" | "Team" | "Company";
  billing: string;
  status: Status;
  avatar?: string;
}

interface StatCardProps {
  title: string;
  value: string | number;
  growth: string;
  feature: string;
  icon: ReactNode;
  bgColor: string;
  isNegative?: boolean;
}

interface StatusBadgeProps {
  status: Status;
}

/* -------------------- MOCK DATA -------------------- */

const users: User[] = [
  {
    id: 1,
    name: "Jamal Kerrod",
    email: "marge.jacobson@gmail.com",
    role: "Maintainer",
    plan: "Enterprise",
    billing: "Auto Debit",
    status: "Active",
  },
  {
    id: 2,
    name: "Shamus Tuttle",
    email: "nicklaus.balistreri24@hotmail.com",
    role: "Subscriber",
    plan: "Basic",
    billing: "Auto Debit",
    status: "Inactive",
  },
  {
    id: 3,
    name: "Devonne Wallbridge",
    email: "michale_goldner@gmail.com",
    role: "Editor",
    plan: "Team",
    billing: "Manual-PayPal",
    status: "Active",
  },
];

/* -------------------- COMPONENTS -------------------- */

const StatCard = ({
  value,
  feature,
  growth,
  icon,
  bgColor,
  isNegative = false,
}: StatCardProps) => (
  <div className="bg-white p-8 rounded-lg shadow-sm flex justify-between items-start border border-gray-100">
    <div>

      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-gray-700">{value}</span>

        <span
          className={`text-sm ${
            isNegative ? "text-red-500" : "text-green-500"
          }`}
        >
          ({growth})
        </span>
      </div>

      <div className="text-xs text-gray-400 mt-1">{feature}</div>
    </div>

    <div className={`p-3 rounded-lg ${bgColor}`}>{icon}</div>
  </div>
);

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const styles: Record<Status, string> = {
    Active: "bg-green-100 text-green-600",
    Inactive: "bg-gray-100 text-gray-500",
    Pending: "bg-orange-100 text-orange-600",
  };

  return (
    <span
      className={`px-2 py-1 rounded text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
};

/* -------------------- MAIN COMPONENT -------------------- */

export default function PlayerList() {
  return (
    <div className="p-0 bg-[#F8F7FA] min-h-screen font-sans text-[#5d596c]">
      <p>Liste des Joueurs /</p><br/>
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Session"
          value="21,459"
          growth="+29%"
          feature="Total users"
          icon={<FiUsers className="text-purple-500" />}
          bgColor="bg-purple-100"
        />

        <StatCard
          title="Paid Users"
          value="4,567"
          growth="+18%"
          feature="Total teams"
          icon={<FiUserCheck className="text-red-500" />}
          bgColor="bg-red-100"
        />

        <StatCard
          title="Active Users"
          value="19,860"
          growth="-14%"
          feature="Total players"
          icon={<FiUserPlus className="text-green-500" />}
          bgColor="bg-green-100"
          isNegative
        />

        <StatCard
          title="Pending Users"
          value="237"
          growth="+42%"
          feature="Total positions"
          icon={<FiUserX className="text-orange-500" />}
          bgColor="bg-orange-100"
        />
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        
        {/* Filters */}
        <div className="p-5 border-b border-gray-100">
          <h3 className="text-lg font-medium mb-4">Search Filter</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select className="border border-[#F8F7FA] rounded-md p-2 outline-none focus:border-green-400 bg-[#F8F7FA]">
              <option>Select Role</option>
            </select>

            <select className="border border-gray-200 rounded-md p-2 outline-none focus:border-purple-400">
              <option>Select Plan</option>
            </select>

            <select className="border border-gray-200 rounded-md p-2 outline-none focus:border-purple-400">
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
              className="border border-gray-200 rounded-md py-2 px-3 focus:outline-none focus:border-purple-400"
            />

            <button className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-md hover:bg-gray-200 transition">
              <FiDownload /> Export
            </button>

            <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-green-400 transition shadow-md shadow-indigo-200">
              <FiPlus /> Add New User
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            
            <thead className="bg-[#F8F7FA] uppercase text-xs font-semibold text-gray-500 border-y border-gray-100">
              <tr>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Plan</th>
                <th className="px-6 py-3">Billing</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {users.map((user) => {
                const initials = user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("");

                return (
                  <tr key={user.id} className="hover:bg-gray-50 transition">

                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
                        {initials}
                      </div>

                      <div>
                        <div className="font-medium text-gray-800">
                          {user.name}
                        </div>
                        <div className="text-xs text-gray-400">
                          {user.email}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="p-1.5 rounded-full bg-blue-50 text-blue-500">
                          <FiUsers size={14} />
                        </span>
                        {user.role}
                      </div>
                    </td>

                    <td className="px-6 py-4 font-medium">{user.plan}</td>

                    <td className="px-6 py-4 text-gray-500">{user.billing}</td>

                    <td className="px-6 py-4">
                      <StatusBadge status={user.status} />
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
       <UsersPagination/>
    </div>
  );
}