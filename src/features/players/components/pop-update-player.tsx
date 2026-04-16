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
  const updatePlayer = useUpdatePlayer();
  const uploadImage = useUploadPlayerImage();

  const { preview, handleImageChange, resetPreview } = useImagePreview();

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
    if (!firstName || !lastName || teamId === null || positionId === null) return;

    const updatedPlayer = await updatePlayer.mutateAsync({
      id: player.id,
      data: {
        firstName,
        lastName,
        teamId,
        positionId,
      },
    });

    if (preview) {
      await uploadImage.mutateAsync({
        playerId: updatedPlayer.id,
        file: await fetch(preview).then(r => r.blob() as unknown as File),
      });
    }

    resetPreview();
  };

  const isLoading = updatePlayer.isPending || uploadImage.isPending;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="hover:text-indigo-500">
          <FiEdit />
        </button>
      </DialogTrigger>

      <DialogContent
        className="
          sm:max-w-md w-[95vw] rounded-xl p-6
          max-h-[90vh]
          overflow-y-auto sm:overflow-visible
        "
      >
        {/* HEADER */}
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FiEdit className="text-indigo-500" />
            Modifier joueur
          </DialogTitle>

          <DialogDescription>
            Modifier les informations du joueur.
          </DialogDescription>
        </DialogHeader>

        {/* FORM */}
        <div className="space-y-4 mt-4">
          {/* LAST NAME */}
          <div>
            <Label>Nom</Label>
            <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>

          {/* FIRST NAME */}
          <div>
            <Label>Prénom</Label>
            <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </div>

          {/* TEAM */}
          <div>
            <Label>Équipe</Label>
            <Select
              value={teamId ? String(teamId) : undefined}
              onValueChange={(v) => setTeamId(Number(v))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choisir équipe" />
              </SelectTrigger>

              <SelectContent>
                {teamsLoading || teams.length === 0 ? (
                  <SelectItem value="empty" disabled>
                    Aucune équipe
                  </SelectItem>
                ) : (
                  teams.map((t) => (
                    <SelectItem key={t.id} value={String(t.id)}>
                      {t.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          {/* POSITION */}
          <div>
            <Label>Position</Label>
            <Select
              value={positionId ? String(positionId) : undefined}
              onValueChange={(v) => setPositionId(Number(v))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choisir position" />
              </SelectTrigger>

              <SelectContent>
                {positionsLoading || positions.length === 0 ? (
                  <SelectItem value="empty" disabled>
                    Aucune position
                  </SelectItem>
                ) : (
                  positions.map((p) => (
                    <SelectItem key={p.id} value={String(p.id)}>
                      {p.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          {/* IMAGE */}
          <div>
            <Label>Photo</Label>

            <div className="flex items-center gap-3 mt-2">
              <label className="cursor-pointer flex items-center gap-2 border px-3 py-2 rounded-md hover:bg-gray-50">
                <FiImage />
                Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              {/* IMAGE FIXED SIZE */}
              <div className="relative w-12 h-12 min-w-12 min-h-12">
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

        {/* FOOTER */}
        <DialogFooter className="pt-6 flex gap-2">
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