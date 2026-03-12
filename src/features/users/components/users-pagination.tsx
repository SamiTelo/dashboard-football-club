"use client";

export function UsersPagination() {
  return (
    <div className="flex items-center justify-between text-sm text-muted-foreground mt-6">
      <p>Showing 1 to 10 of 100 entries</p>

      <div className="flex gap-2">
        <button className="px-3 py-1 rounded-md border">Previous</button>
        <button className="px-3 py-1 rounded-md bg-primary text-white">
          1
        </button>
        <button className="px-3 py-1 rounded-md border">2</button>
        <button className="px-3 py-1 rounded-md border">3</button>
        <button className="px-3 py-1 rounded-md border">Next</button>
      </div>
    </div>
  );
}