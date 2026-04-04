import { Spinner } from "@/components/ui/spinner";
import { LogOut } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export function LogoutButton() {
  const { logout, loading } = useAuth();

  return loading ? (
    <Spinner className="h-5 w-5 text-red-500 animate-spin" />
  ) : (
    <LogOut
      className="h-5 w-5 cursor-pointer text-red-500"
      onClick={logout}
    />
  );
}