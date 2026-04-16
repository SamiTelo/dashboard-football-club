"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Trash2Icon } from "lucide-react";
import { FiTrash2 } from "react-icons/fi";
import { Spinner } from "@/components/ui/spinner";

import { useDeletePlayer } from "../hooks/usePlayers";

interface PopDeletePlayerProps {
  playerId: number;
}

export function PopDeletePlayer({ playerId }: PopDeletePlayerProps) {
  const deletePlayer = useDeletePlayer();

  const handleDelete = async () => {
    try {
      await deletePlayer.mutateAsync(playerId);
    } catch (error) {
      console.error("Error deleting player:", error);
    }
  };

  const isLoading = deletePlayer.isPending;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <FiTrash2 className="cursor-pointer text-gray-500 transition hover:text-red-500 hover:scale-110" />
      </AlertDialogTrigger>

      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-red-100 text-red-600 rounded-full flex items-center justify-center dark:bg-red-500/20 dark:text-red-400 [&>svg]:w-4 [&>svg]:h-4">
            <Trash2Icon />
          </AlertDialogMedia>

          <AlertDialogTitle>
            Supprimer ce joueur ?
          </AlertDialogTitle>

          <AlertDialogDescription className="text-xs text-muted-foreground">
            Cette action est{" "}
            <span className="font-semibold text-red-500">
              irréversible
            </span>.
            Le joueur sera définitivement supprimé du système.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel
            variant="outline"
            disabled={isLoading}
          >
            Annuler
          </AlertDialogCancel>

          <AlertDialogAction
            variant="destructive"
            className="bg-red-600 hover:bg-red-700 flex items-center justify-center"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading && (
              <Spinner className="mr-2 h-4 w-4" />
            )}
            {isLoading ? "Suppression..." : "Supprimer"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}