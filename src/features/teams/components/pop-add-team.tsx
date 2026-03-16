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

export function PopAddTeam() {

  const { preview, handleImageChange } = useImagePreview();

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

        <form className="space-y-4 mt-4">

          <FieldGroup>

            <Field className="space-y-2">
              <Label>Nom</Label>
              <Input placeholder="Ex: Arsenal" />
            </Field>

            {/* IMAGE UPLOAD */}

            <Field className="space-y-2">
              <Label>Logo de l&#39;équipe</Label>

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
              <Button variant="outline">
                Annuler
              </Button>
            </DialogClose>

            <Button className="bg-black hover:bg-green-400">
              Enregistrer
            </Button>

          </DialogFooter>

        </form>
      </DialogContent>
    </Dialog>
  );
}