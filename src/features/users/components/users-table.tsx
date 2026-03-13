"use client";

import * as React from "react";
import { Pencil, Trash2, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { User } from "../type";
import { UsersFilters } from "./users-filters";

interface UsersTableProps {
  users: User[];
}

export function UsersTable({ users }: UsersTableProps) {
  return (
    <div className="rounded-sm border bg-white">
      <UsersFilters/>
      <table className="w-full text-sm">
        <thead className="border-b bg-muted/40 text-muted-foreground">
          <tr className="text-left">
            <th className="p-4">User</th>
            <th className="p-4">Role</th>
            <th className="p-4">Plan</th>
            <th className="p-4">Billing</th>
            <th className="p-4">Status</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-b last:border-0 hover:bg-muted/30 transition"
            >
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                    {user.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
              </td>

              <td className="p-4">{user.role}</td>
              <td className="p-4">{user.plan}</td>
              <td className="p-4">{user.billing}</td>

              <td className="p-4">
                <span
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium",
                    user.status === "Active" &&
                      "bg-green-100 text-green-700",
                    user.status === "Inactive" &&
                      "bg-gray-200 text-gray-600",
                    user.status === "Pending" &&
                      "bg-yellow-100 text-yellow-700"
                  )}
                >
                  {user.status}
                </span>
              </td>

              <td className="p-4">
                <div className="flex justify-end gap-2">
                  <button className="p-2 rounded-md hover:bg-muted">
                    <Pencil size={16} />
                  </button>
                  <button className="p-2 rounded-md hover:bg-muted">
                    <Trash2 size={16} />
                  </button>
                  <button className="p-2 rounded-md hover:bg-muted">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}