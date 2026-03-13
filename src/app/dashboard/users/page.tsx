<<<<<<< HEAD
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
=======
>>>>>>> 1a2736170b3ebdb038c4a7f0dc63241dbbf30fe3

export default function UsersPage() {
  return (
   <main className="space-y-6 p-6">
<<<<<<< HEAD
      <UsersTable users={users} />
      <UsersPagination />
=======
    <p>listes users</p>
>>>>>>> 1a2736170b3ebdb038c4a7f0dc63241dbbf30fe3
    </main>
  );
}