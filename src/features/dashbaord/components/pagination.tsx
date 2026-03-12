"use client";

export function Pagination() {
  return (
    <div className="flex items-center justify-between text-sm text-muted-foreground mt-6">
      <p className="hidden sm:block">Affichage de 1 à 10 sur 100 entrées</p>

      <div className="flex gap-2">
        <button className="px-3 py-1 rounded-md border">Précédent</button>
        <button className="px-3 py-1 rounded-md bg-primary text-white">
          1
        </button>
        <button className="px-3 py-1 rounded-md border">2</button>
        <button className="px-3 py-1 rounded-md border">3</button>
        <button className="px-3 py-1 rounded-md border">Suivant</button>
      </div>
    </div>
  );
}