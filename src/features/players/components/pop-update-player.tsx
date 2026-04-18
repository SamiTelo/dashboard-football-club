"use client";

import { useEffect, useState } from "react";
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FiEdit, FiImage } from "react-icons/fi";

import { useUpdatePlayer, useUploadPlayerImage } from "../hooks/usePlayers";
import { useTeams } from "@/features/teams/hooks/useTeams";
import { usePositions } from "@/features/positions/hooks/usePositions";


import type { Player } from "../types/players-types";
import { useImagePreview } from "@/hooks/useImagePreview";

interface PopUpdatePlayerProps {
  player: Player;
}

export function PopUpdatePlayer({ player }: PopUpdatePlayerProps) {
  const [open, setOpen] = useState(false);

  const updatePlayer = useUpdatePlayer();
  const uploadImage = useUploadPlayerImage();

  const { preview, file, handleImageChange, resetPreview } = useImagePreview();

  const [firstName, setFirstName] = useState(player.firstName);
  const [lastName, setLastName] = useState(player.lastName);
  const [teamId, setTeamId] = useState<number | null>(player.teamId);
  const [positionId, setPositionId] = useState<number | null>(
    player.positionId,
  );

  const { data: teamsData, isLoading: teamsLoading } = useTeams({
    page: 1,
    limit: 100,
  });

  const { data: positionsData, isLoading: positionsLoading } = usePositions({
    page: 1,
    limit: 100,
  });

  const teams = teamsData?.data ?? [];
  const positions = positionsData?.data ?? [];

  useEffect(() => {
    setFirstName(player.firstName);
    setLastName(player.lastName);
    setTeamId(player.teamId);
    setPositionId(player.positionId);
  }, [player]);

  const isLoading = updatePlayer.isPending || uploadImage.isPending;

  const handleSubmit = async () => {
    if (!firstName || !lastName || teamId === null || positionId === null)
      return;

    try {
      const updatedPlayer = await updatePlayer.mutateAsync({
        id: player.id,
        data: {
          firstName,
          lastName,
          teamId,
          positionId,
        },
      });

      if (file) {
        await uploadImage.mutateAsync({
          playerId: updatedPlayer.id,
          file,
        });
      }

      resetPreview();
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="hover:text-indigo-500">
          <FiEdit />
        </button>
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
            <FiEdit className="text-indigo-500" />
            Modifier joueur
          </DialogTitle>

          <DialogDescription className="text-left">
            Modifier les informations du joueur.
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

                <div className="relative w-12 h-12">
                  {preview ? (
                    <Image
                      src={preview}
                      alt="preview"
                      fill
                      unoptimized
                      className="rounded-full object-cover border"
                    />
                  ) : player.imageUrl ? (
                    <Image
                      src={player.imageUrl}
                      alt="current"
                      fill
                      className="rounded-full object-cover border"
                    />
                  ) : null}
                </div>
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
            className="bg-black hover:bg-indigo-500"
          >
            {isLoading ? "Mise à jour..." : "Sauvegarder"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
