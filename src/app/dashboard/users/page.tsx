import { UsersTable } from "@/features/users/components/users-table";
import { UsersPagination } from "@/features/users/components/users-pagination";
import { User } from "@/features/users/type";

const users: User[] = [
  {
    id: "1",
    name: "Jamal Kerrod",
    email: "jamal@email.com",
    role: "Maintainer",
    plan: "Enterprise",
    billing: "Auto Debit",
    status: "Active",
  },
  {
    id: "2",
    name: "Shamus Tuttle",
    email: "shamus@email.com",
    role: "Subscriber",
    plan: "Basic",
    billing: "Auto Debit",
    status: "Inactive",
  },
];

export default function UsersPage() {
  return (
   <main className="space-y-6 p-6">
      <UsersTable users={users} />
      <UsersPagination />
    </main>
  );
}