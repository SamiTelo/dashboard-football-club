import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";

import {
  CreatePlayerDto,
  UpdatePlayerDto,
  Player,
  GetPlayersQuery,
} from "../types/players-types";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { playerService } from "../services/players.service";

// =========================
// GET ALL
// =========================
export const usePlayers = (params: GetPlayersQuery) => {
  const { user, loading: authLoading } = useAuth(true);

  return useQuery({
    queryKey: [
      "players",
      user?.id,
      params.page,
      params.limit,
      params.search,
      params.teamId,
      params.positionId,
    ],
    queryFn: () => playerService.getAll(params),
    placeholderData: keepPreviousData,
    enabled: !!user?.id && !authLoading,
  });
};

// =========================
// GET ONE
// =========================
export const usePlayer = (id?: number) =>
  useQuery<Player>({
    queryKey: ["player", id],
    queryFn: () => playerService.getOne(id as number),
    enabled: !!id,
  });

// =========================
// CREATE
// =========================
export const useCreatePlayer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePlayerDto) =>
      playerService.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["players"],
        exact: false,
      });
    },
  });
};

// =========================
// UPDATE
// =========================
export const useUpdatePlayer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: UpdatePlayerDto;
    }) => playerService.update(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["players"],
        exact: false,
      });

      queryClient.invalidateQueries({
        queryKey: ["player", variables.id],
        exact: false,
      });
    },
  });
};

// =========================
// DELETE
// =========================
export const useDeletePlayer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      playerService.delete(id),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["players"],
        exact: false,
      });

      queryClient.removeQueries({
        queryKey: ["player", id],
        exact: false,
      });
    },
  });
};

// =========================
// UPLOAD PLAYER IMAGE
// =========================
export const useUploadPlayerImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      playerId,
      file,
    }: {
      playerId: number;
      file: File;
    }) => playerService.uploadImage(playerId, file),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["players"],
        exact: false,
      });

      queryClient.invalidateQueries({
        queryKey: ["player", variables.playerId],
        exact: false,
      });
    },
  });
};