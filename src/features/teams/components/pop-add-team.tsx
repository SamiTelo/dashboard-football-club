"use client";

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

import { FiPlus, FiUser, FiImage } from "react-icons/fi";

import { useImagePreview } from "../hooks/use-image-preview";
import { useState } from "react";

import { useCreateTeam, useUploadTeamLogo } from "../hooks/useTeams";

export function PopAddTeam() {
  const { preview, handleImageChange, file } = useImagePreview();

  const [name, setName] = useState("");
  const [country, setCountry] = useState("");

  const createTeam = useCreateTeam();
  const uploadLogo = useUploadTeamLogo();

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // CREATE TEAM
      const team = await createTeam.mutateAsync({
        name,
        country,
      });

      // UPLOAD LOGO (optional)
      if (file) {
        await uploadLogo.mutateAsync({
          teamId: team.id,
          file,
        });
      }

      // reset
      setName("");
      setCountry(""); // reset
    } catch (error) {
      console.error("Error creating team:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 bg-black text-white hover:bg-green-500 transition shadow-md">
          <FiPlus className="text-lg" />
          Ajouter une équipe
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md rounded-xl p-6">

        <DialogHeader className="space-y-2">
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
            <FiUser className="text-green-500" />
            Ajouter une nouvelle équipe
          </DialogTitle>

          <DialogDescription className="text-sm text-muted-foreground">
            Remplissez les informations ci-dessous puis cliquez sur enregistrer.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <FieldGroup>

            {/* NAME */}
            <Field className="space-y-2">
              <Label>Nom</Label>
              <Input
                placeholder="Ex: Arsenal"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Field>

            {/* COUNTRY  */}
            <Field className="space-y-2">
              <Label>Pays</Label>
              <Input
                placeholder="Ex: Angleterre"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </Field>

            {/* IMAGE UPLOAD */}
            <Field className="space-y-2">
              <Label>Logo de l&apos;équipe</Label>

              <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg h-40 cursor-pointer hover:border-green-400 transition">

                {preview ? (
                  <Image
                    src={preview}
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
              disabled={createTeam.isPending || uploadLogo.isPending}
            >
              Enregistrer
            </Button>
          </DialogFooter>

        </form>
      </DialogContent>
    </Dialog>
  );
}