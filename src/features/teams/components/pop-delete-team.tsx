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

export function PopDeleteTeam() {
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
            Supprimer cette équipe ?
          </AlertDialogTitle>

          <AlertDialogDescription className="text-xs text-muted-foreground">
            Cette action est <span className="font-semibold text-red-500">irréversible</span>.
            L’équipe sera définitivement supprimée du système.
          </AlertDialogDescription>

        </AlertDialogHeader>

        <AlertDialogFooter>

          <AlertDialogCancel variant="outline">
            Annuler
          </AlertDialogCancel>

          <AlertDialogAction
            variant="destructive"
            className="bg-red-600 hover:bg-red-700"
          >
            Supprimer
          </AlertDialogAction>

        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}