"use client";

import React from "react";
import { FiMoreVertical } from "react-icons/fi";
import { UserListItem } from "../types/users.types";
import { RoleBadge } from "./role-badge";
import { VerifiedBadge } from "./verified-badge";
import { getInitial } from "@/features/utils/getInitials";
import { AlertDialogDestructive } from "./pop-alert-delete";
import { PopUpdateUsers } from "./pop-udpdate-user";
import { StatusBadge } from "./status-badge";


interface UserRowProps {
  user: UserListItem;
}

export const UserRow = ({ user }: UserRowProps) => {
  const initials = getInitial(user.name);

  return (
    <tr className="hover:bg-gray-50 transition">

      <td className="px-6 py-4">
        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
          #{user.id}
        </span>
      </td>

      {/* USER */}
      <td className="px-6 py-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
          {initials}
        </div>

        <div>
          <div className="font-medium text-gray-800">{user.name}</div>
          <div className="text-xs text-gray-400">{user.email}</div>
        </div>
      </td>

      {/* ROLE */}
      <td className="px-6 py-4">
        <RoleBadge role={user.role} />
      </td>

      {/* CREATED */}
      <td className="px-6 py-4 text-gray-500">
        {new Date(user.createdAt).toLocaleDateString()}
      </td>

      {/* UPDATED */}
      <td className="px-6 py-4 text-gray-500 ">
        {new Date(user.updatedAt).toLocaleDateString()}
      </td>

      {/* STATUS */}
      <td className="px-6 py-4">
        <StatusBadge status={user.status} />
      </td>

      <td className="px-6 py-4">
        <VerifiedBadge isVerified={user.isVerified} />
      </td>

      {/* ACTIONS */}
      <td className="px-6 py-4">
        <div className="flex justify-center gap-2 text-gray-400">
          <PopUpdateUsers/>
          <AlertDialogDestructive/>
          <FiMoreVertical className="cursor-pointer hover:text-gray-700" />
        </div>
      </td>
    </tr>
  );
};
