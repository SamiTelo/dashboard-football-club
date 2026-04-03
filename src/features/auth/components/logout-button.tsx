"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Spinner } from "@/components/ui/spinner";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const router = useRouter(); 
  const { logout } = useAuth(true);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      router.replace("/auth/login");
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return loading ? (
    <Spinner className="h-5 w-5 text-red-500 animate-spin" />
  ) : (
    <LogOut
      className="h-5 w-5 cursor-pointer text-red-500"
      onClick={handleLogout}
    />
  );
}