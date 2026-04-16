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
import { useImagePreview } from "../hooks/use-image-preview";

import type { Player } from "../types/players-types";

interface PopUpdatePlayerProps {
  player: Player;
}

export function PopUpdatePlayer({ player }: PopUpdatePlayerProps) {
  const [open, setOpen] = useState(false); // ✅ ajouté

  const updatePlayer = useUpdatePlayer();
  const uploadImage = useUploadPlayerImage();
  const { preview, file, handleImageChange, resetPreview } = useImagePreview();

  const [firstName, setFirstName] = useState(player.firstName);
  const [lastName, setLastName] = useState(player.lastName);
  const [teamId, setTeamId] = useState<number | null>(player.teamId);
  const [positionId, setPositionId] = useState<number | null>(player.positionId);

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
      setOpen(false); //ferme automatiquement la popup
    } catch (error) {
      console.error(error);
    }
  };

  const isLoading = updatePlayer.isPending || uploadImage.isPending;

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
        <DialogHeader className="shrink-0">
          <DialogTitle className="flex items-left gap-2 text-xl font-semibold">
            <FiEdit className="text-indigo-500" />
            Modifier joueur
          </DialogTitle>

          <DialogDescription>
            Modifier les informations du joueur.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 sm:overflow-visible overflow-y-auto mt-4 space-y-4 pr-1">
          <div>
            <Label>Nom</Label>
            <Input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div>
            <Label>Prénom</Label>
            <Input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div>
            <Label>Équipe</Label>
            <Select
              value={teamId ? String(teamId) : ""}
              onValueChange={(v) => setTeamId(Number(v))}
            >
              <SelectTrigger className="w-full">
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
          </div>

          <div>
            <Label>Position</Label>
            <Select
              value={positionId ? String(positionId) : ""}
              onValueChange={(v) => setPositionId(Number(v))}
            >
              <SelectTrigger className="w-full">
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
          </div>

          <div>
            <Label>Photo</Label>

            <div className="flex items-center gap-3 mt-2">
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

              <div className="relative w-12 h-12 shrink-0">
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
          </div>
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