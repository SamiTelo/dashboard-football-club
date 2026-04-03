"use client";
import React from "react";
import { users } from "./data/users.data";
import { UserFilters } from "./components/users-filters";
import { Pagination } from "../dashbaord/components/pagination";
import { UserTable } from "./components/users-table";
import { UserActions } from "./components/users-actions";
import { UsersExport } from "./hooks/users-export-pdf";

  


export default function UserListDashboard() {
  const { exportPDF } = UsersExport(); 
  return (
    <div className="p-0 bg-[#F8F7FA] min-h-screen text-[13px] md:text-[14px] font-sans text-[#5d596c]">
      
      <p>Listes des utilisateurs /</p>
      <br />

      <div className="bg-white rounded-lg border border-gray-100">
        <UserFilters />
        <UserActions onExport={exportPDF} />
        <UserTable users={users} />
      </div>

      <Pagination/>
    </div>
  );
}
