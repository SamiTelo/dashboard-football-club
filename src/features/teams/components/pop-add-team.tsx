"use client";

import Image from "next/image";
import { useState } from "react";

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

import { FiPlus, FiUser, FiImage } from "react-icons/fi";

import { useImagePreview } from "../hooks/use-image-preview";
import { useCreateTeam, useUploadTeamLogo } from "../hooks/useTeams";

export function PopAddTeam() {
  const [open, setOpen] = useState(false);

  const { preview, handleImageChange, file, resetPreview } =
    useImagePreview();

  const [name, setName] = useState("");
  const [country, setCountry] = useState("");

  const createTeam = useCreateTeam();
  const uploadLogo = useUploadTeamLogo();

  const isLoading = createTeam.isPending || uploadLogo.isPending;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return;

    try {
      const team = await createTeam.mutateAsync({
        name: name.trim(),
        country: country.trim() || undefined,
      });

      if (file) {
        await uploadLogo.mutateAsync({
          teamId: team.id,
          file,
        });
      }

      setName("");
      setCountry("");
      resetPreview();
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 bg-black text-white hover:bg-green-500 transition shadow-md">
          <FiPlus className="text-lg" />
          Ajouter une équipe
        </Button>
      </DialogTrigger>

      {/* ✅ RESPONSIVE DIALOG */}
      <DialogContent
        className="
          w-[95vw]
          sm:max-w-md
          rounded-xl
          p-4
          sm:p-6
          max-h-[90vh]
          overflow-y-auto
        "
      >
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
                required
              />
            </Field>

            {/* COUNTRY */}
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

              <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg h-40 cursor-pointer hover:border-green-400 transition overflow-hidden">
                
                {preview ? (
                  <div className="relative w-full h-full flex items-center justify-center p-2">
                    <Image
                      src={preview}
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
                />
              </label>
            </Field>
          </FieldGroup>

          {/* FOOTER */}
          <DialogFooter className="pt-6 flex flex-col sm:flex-row gap-2">
            <DialogClose asChild>
              <Button
                variant="outline"
                disabled={isLoading}
                className="w-full sm:w-auto"
              >
                Annuler
              </Button>
            </DialogClose>

            <Button
              type="submit"
              disabled={isLoading}
              className="bg-black hover:bg-green-400 flex items-center justify-center w-full sm:w-auto"
            >
              {isLoading && (
                <Spinner className="mr-2 h-4 w-4" />
              )}
              {isLoading ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}