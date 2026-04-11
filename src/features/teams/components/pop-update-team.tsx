"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

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

import { FiEdit, FiImage, FiUser } from "react-icons/fi";

import { useImagePreview } from "../hooks/use-image-preview";
import { useUpdateTeam, useUploadTeamLogo } from "../hooks/useTeams";
import { Team } from "../types/teams-types";

interface PopUpdateTeamProps {
  team: Team;
}

export function PopUpdateTeam({ team }: PopUpdateTeamProps) {
  const { preview, handleImageChange, file, resetPreview } = useImagePreview();

  const updateTeam = useUpdateTeam();
  const uploadLogo = useUploadTeamLogo();

  const [name, setName] = useState(team.name);

  // reset form when open
  useEffect(() => {
    setName(team.name);
  }, [team]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // UPDATE TEAM DATA
      await updateTeam.mutateAsync({
        id: team.id,
        data: {
          name,
        },
      });

      // UPLOAD NEW LOGO (optional)
      if (file) {
        await uploadLogo.mutateAsync({
          teamId: team.id,
          file,
        });
      }

      resetPreview();
    } catch (error) {
      console.error("Error updating team:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <FiEdit className="cursor-pointer hover:text-indigo-500" />
      </DialogTrigger>

      <DialogContent className="sm:max-w-md rounded-xl p-6">
        <DialogHeader className="space-y-2">
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
            <FiUser className="text-blue-500" />
            Mise à jours de l&apos;équipe
          </DialogTitle>

          <DialogDescription className="text-sm text-muted-foreground">
            Modifier les informations de l&apos;équipe puis cliquez sur enregistrer.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <FieldGroup>
            {/* NAME */}
            <Field className="space-y-2">
              <Label>Nom</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </Field>

            {/* IMAGE */}
            <Field className="space-y-2">
              <Label>Logo de l&apos;équipe</Label>

              <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg h-40 cursor-pointer hover:border-green-400 transition">
                {preview || team.logoUrl ? (
                  <Image
                    src={preview || team.logoUrl || ""}
                    alt="preview"
                    width={120}
                    height={120}
                    className="object-contain"
                  />
                ) : (
                  <div className="flex flex-col items-center text-gray-400 text-sm">
                    <FiImage className="text-2xl mb-2" />
                    Choisir une image
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </Field>
          </FieldGroup>

          <DialogFooter className="pt-6 flex gap-2">
            <DialogClose asChild>
              <Button variant="outline">Annuler</Button>
            </DialogClose>

            <Button
              type="submit"
              className="bg-black hover:bg-green-400"
              disabled={updateTeam.isPending || uploadLogo.isPending}
            >
              Enregistrer
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
