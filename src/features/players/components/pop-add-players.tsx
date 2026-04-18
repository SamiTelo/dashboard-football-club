"use client";

import { useState } from "react";
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useCreatePlayer, useUploadPlayerImage } from "../hooks/usePlayers";
import { useTeams } from "@/features/teams/hooks/useTeams";
import { usePositions } from "@/features/positions/hooks/usePositions";
import { useImagePreview } from "@/hooks/useImagePreview";

export function PopAddPlayers() {
  const [open, setOpen] = useState(false);

  const createPlayer = useCreatePlayer();
  const uploadImage = useUploadPlayerImage();

  const { preview, file, handleImageChange, resetPreview } =
    useImagePreview();

  const { data: teamsData, isLoading: teamsLoading } = useTeams({
    page: 1,
    limit: 100,
  });

  const { data: positionsData, isLoading: positionsLoading } =
    usePositions({
      page: 1,
      limit: 100,
    });

  const teams = teamsData?.data ?? [];
  const positions = positionsData?.data ?? [];

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [teamId, setTeamId] = useState<number | null>(null);
  const [positionId, setPositionId] = useState<number | null>(null);

  const isLoading =
    createPlayer.isPending || uploadImage.isPending;

  const handleSubmit = async () => {
    if (!firstName || !lastName || !teamId || !positionId) return;

    try {
      const player = await createPlayer.mutateAsync({
        firstName,
        lastName,
        teamId,
        positionId,
      });

      if (file) {
        await uploadImage.mutateAsync({
          playerId: player.id,
          file,
        });
      }

      // reset form
      setFirstName("");
      setLastName("");
      setTeamId(null);
      setPositionId(null);
      resetPreview();

      setOpen(false); // FERMETURE AUTOMATIQUE
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 bg-black text-white hover:bg-green-500 transition shadow-md">
          <FiPlus />
          Ajouter un joueur
        </Button>
      </DialogTrigger>

      <DialogContent
        className="
          w-[95vw]
          max-w-md
          sm:max-w-md
          rounded-xl
          p-4 sm:p-6
          max-h-[90vh]
          flex flex-col
        "
      >
        <DialogHeader className="shrink-0 text-left">
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold text-left">
            <FiUser className="text-green-500" />
            Ajouter un joueur
          </DialogTitle>

          <DialogDescription className="text-left">
            Remplissez les informations du joueur.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 sm:overflow-visible overflow-y-auto mt-4 space-y-4 pr-1">
          <FieldGroup>
            <Field>
              <Label>Nom</Label>
              <Input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Ex: Ronaldo"
              />
            </Field>

            <Field>
              <Label>Prénom</Label>
              <Input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Ex: Cristiano"
              />
            </Field>

            <Field>
              <Label>Équipe</Label>
              <Select
                value={teamId ? String(teamId) : ""}
                onValueChange={(v) => setTeamId(Number(v))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choisir une équipe" />
                </SelectTrigger>

                <SelectContent>
                  {teamsLoading ? (
                    <SelectItem value="loading" disabled>
                      Chargement...
                    </SelectItem>
                  ) : teams.length ? (
                    teams.map((t) => (
                      <SelectItem key={t.id} value={String(t.id)}>
                        {t.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="empty" disabled>
                      Aucune équipe
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <Label>Position</Label>
              <Select
                value={positionId ? String(positionId) : ""}
                onValueChange={(v) => setPositionId(Number(v))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choisir une position" />
                </SelectTrigger>

                <SelectContent>
                  {positionsLoading ? (
                    <SelectItem value="loading" disabled>
                      Chargement...
                    </SelectItem>
                  ) : positions.length ? (
                    positions.map((p) => (
                      <SelectItem key={p.id} value={String(p.id)}>
                        {p.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="empty" disabled>
                      Aucune position
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <Label>Photo</Label>

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 border px-3 py-2 rounded-md cursor-pointer hover:bg-gray-50">
                  <FiImage />
                  Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>

                {preview && (
                  <div className="relative w-12 h-12">
                    <Image
                      src={preview}
                      alt="preview"
                      fill
                      unoptimized
                      className="rounded-full object-cover border"
                    />
                  </div>
                )}
              </div>
            </Field>
          </FieldGroup>
        </div>

        <DialogFooter className="pt-4 shrink-0 flex gap-2">
          <DialogClose asChild>
            <Button variant="outline">Annuler</Button>
          </DialogClose>

          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-black hover:bg-green-500"
          >
            {isLoading ? "Création..." : "Enregistrer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}