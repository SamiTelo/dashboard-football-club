"use client";

import React from "react";
import { UserRow } from "./users-row";
import { UserListItem } from "../types/users.types";

interface UserTableProps {
  users: UserListItem[];
}

export const UserTable = ({ users }: UserTableProps) => (
  <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#F8F7FA] uppercase text-xs font-semibold text-gray-500 border-y border-gray-100">
        <tr>
          <th className="px-6 py-3">ID</th>
          <th className="px-6 py-3">Utilisateurs</th>
          <th className="px-6 py-3">Role</th>
          <th className="px-6 py-3">CreatedAt</th>
          <th className="px-6 py-3">UpdatedAt</th>
          <th className="px-6 py-3">Status</th>
          <th className="px-6 py-3">isVerified</th>
          <th className="px-6 py-3 text-center">Actions</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-100">
        {users.map((user) => (
          <UserRow key={user.id} user={user} />
        ))}
      </tbody>

    </table>
  </div>
);
