"use client";

interface PaginationProps {
  page: number;
  totalPages: number;
  total: number;
  limit: number;

  onPageChange: (page: number) => void;
}

export function Pagination({
  page,
  totalPages,
  total,
  limit,
  onPageChange,
}: PaginationProps) {
  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  return (
    <div className="flex items-center justify-between text-sm text-muted-foreground mt-6">
      <p className="hidden sm:block">
        Affichage de {start} à {end} sur {total} entrées
      </p>

      <div className="flex gap-2">
        <button
          className="px-3 py-1 rounded-md border disabled:opacity-50"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
        >
          Précédent
        </button>

        {Array.from({ length: totalPages }).map((_, i) => {
          const p = i + 1;

          return (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`px-3 py-1 rounded-md border ${
                page === p ? "bg-primary text-white" : ""
              }`}
            >
              {p}
            </button>
          );
        })}

        <button
          className="px-3 py-1 rounded-md border disabled:opacity-50"
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
        >
          Suivant
        </button>
      </div>
    </div>
  );
}