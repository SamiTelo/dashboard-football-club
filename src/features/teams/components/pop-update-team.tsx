"use client";

import { useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
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
  const { preview, handleImageChange, file, resetPreview } =
    useImagePreview();

  const updateTeam = useUpdateTeam();
  const uploadLogo = useUploadTeamLogo();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");

  const isLoading = updateTeam.isPending || uploadLogo.isPending;

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);

    if (isOpen) {
      setName(team.name);
      setCountry(team.country ?? "");
    } else {
      resetPreview();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateTeam.mutateAsync({
        id: team.id,
        data: {
          name,
          country,
        },
      });

      if (file) {
        await uploadLogo.mutateAsync({
          teamId: team.id,
          file,
        });
      }

      resetPreview();
      setOpen(false);
    } catch (error) {
      console.error("Error updating team:", error);
    }
  };

  const imageToShow = preview || team.logoUrl;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <FiEdit className="cursor-pointer hover:text-indigo-500" />
      </DialogTrigger>

      <DialogContent className="sm:max-w-md rounded-xl p-6">
        <DialogHeader className="space-y-2">
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
            <FiUser className="text-blue-500" />
            Mise à jour de l’équipe
          </DialogTitle>

          <DialogDescription className="text-sm text-muted-foreground">
            Modifier les informations puis enregistrer.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <FieldGroup>
            {/* NAME */}
            <Field className="space-y-2">
              <Label>Nom</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
              />
            </Field>

            {/* COUNTRY */}
            <Field className="space-y-2">
              <Label>Pays</Label>
              <Input
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                disabled={isLoading}
              />
            </Field>

            {/* IMAGE */}
            <Field className="space-y-2">
              <Label>Logo de l’équipe</Label>

              <label className="relative flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg h-32 sm:h-36 cursor-pointer hover:border-green-400 transition overflow-hidden">

                {imageToShow ? (
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24">
                    <Image
                      src={imageToShow}
                      alt="preview"
                      fill
                      className="object-contain"
                    />
                  </div>
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
                  disabled={isLoading}
                />
              </label>
            </Field>
          </FieldGroup>

          <DialogFooter className="pt-6 flex gap-2">
            <DialogClose asChild>
              <Button variant="outline" disabled={isLoading}>
                Annuler
              </Button>
            </DialogClose>

            <Button
              type="submit"
              disabled={isLoading}
              className="bg-black hover:bg-green-400 flex items-center justify-center"
            >
              {isLoading && <Spinner className="mr-2 h-4 w-4" />}
              {isLoading ? "Modification..." : "Enregistrer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}