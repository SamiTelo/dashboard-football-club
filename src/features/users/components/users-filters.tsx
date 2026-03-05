"use client";

export function UsersFilters() {
  return (
    <div className="border bg-white  p-4 space-y-4">
      <h2 className="text-sm font-semibold text-muted-foreground">
        Search Filter
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select className="h-10 rounded-lg border px-3 text-sm">
          <option>Select Role</option>
        </select>

        <select className="h-10 rounded-lg border px-3 text-sm">
          <option>Select Plan</option>
        </select>

        <select className="h-10 rounded-lg border px-3 text-sm">
          <option>Select Status</option>
        </select>
      </div>
    </div>
  );
}