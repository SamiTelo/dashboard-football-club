"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FiEdit, FiUser } from "react-icons/fi";
import { useUpdatePosition } from "../hooks/usePositions";
import { Position } from "../types/positions-types";

interface PopUpdatePositionsProps {
  position: Position;
}

export function PopUpdatePositions({ position }: PopUpdatePositionsProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(position.name);

  const { mutate, isPending } = useUpdatePosition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return;

    mutate(
      { id: position.id, data: { name } },
      {
        onSuccess: () => {
          setOpen(false); // ferme popup
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <FiEdit className="cursor-pointer hover:text-indigo-500" />
      </DialogTrigger>

      <DialogContent className="sm:max-w-md rounded-xl p-6">
        <DialogHeader className="space-y-2">
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
            <FiUser className="text-blue-500" />
            Mise à jours du poste
          </DialogTitle>

          <DialogDescription className="text-sm text-muted-foreground">
            Modifier les informations du poste puis cliquez sur
            Enregistrer.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <FieldGroup>
            <Field className="space-y-2">
              <Label>Nom</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Field>
          </FieldGroup>

          <DialogFooter className="pt-6 flex gap-2">
            <DialogClose asChild>
              <Button variant="outline">Annuler</Button>
            </DialogClose>

            <Button
              type="submit"
              disabled={isPending}
              className="bg-black hover:bg-green-400"
            >
              {isPending ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}