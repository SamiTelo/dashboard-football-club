import { Spinner } from "@/components/ui/spinner";

export default function DashboardLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <Spinner className="h-10 w-10 text-green-500" />
    </div>
  );
}