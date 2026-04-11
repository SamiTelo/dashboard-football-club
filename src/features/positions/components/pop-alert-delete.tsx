"use client";

import { useState } from "react";
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
import { useDeletePosition } from "../hooks/usePositions";

interface PopDeletePositionsProps {
  id: number;
}

export function PopDeletePositions({ id }: PopDeletePositionsProps) {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useDeletePosition();

  const handleDelete = () => {
    mutate(id, {
      onSuccess: () => {
        setOpen(false); // ferme popup
      },
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <FiTrash2 className="cursor-pointer text-gray-500 transition hover:text-red-500 hover:scale-110" />
      </AlertDialogTrigger>

      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-red-100 text-red-600 rounded-full dark:bg-red-500/20 dark:text-red-400">
            <Trash2Icon />
          </AlertDialogMedia>

          <AlertDialogTitle>
            Supprimer ce poste ?
          </AlertDialogTitle>

          <AlertDialogDescription className="text-xs text-muted-foreground">
            Cette action est{" "}
            <span className="font-semibold text-red-500">
              irréversible
            </span>.
            Le poste sera définitivement supprimé du système ainsi que
            toutes les données associées.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">
            Annuler
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={isPending}
            variant="destructive"
            className="bg-red-600 hover:bg-red-700"
          >
            {isPending ? "Suppression..." : "Supprimer"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}