"use client";
import React from "react";
import { FiShield, FiEdit, FiUser } from "react-icons/fi";
import { UserRole } from "../types/users.types";

interface RoleBadgeProps {
  role: UserRole;
}

const styles: Record<UserRole, string> = {
  Admin: "bg-blue-100 text-blue-600",
  SuperAdmin: "bg-orange-100 text-orange-600", 
  Utilisateur: "bg-green-100 text-green-600",
};

const icons: Record<UserRole, React.ElementType> = {
  Admin: FiEdit,
  SuperAdmin: FiShield, 
  Utilisateur: FiUser,
};

export const RoleBadge = ({ role }: RoleBadgeProps) => {
  const Icon = icons[role];
  return (
   <div className="flex items-center gap-3">
     <span className={`w-7 h-7 rounded-full flex items-center justify-center ${styles[role]}`}>
      <Icon size={12} />
    </span>
    
    <span className="text-sm font-medium">{role}</span>
   </div>
  );
};
