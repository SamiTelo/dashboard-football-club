import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { CreateTeamDto, GetTeamsQuery, Team, UpdateTeamDto } from "../types/teams-types";
import { teamService } from "../services/teams-services";


// =========================
// GET ALL
// =========================
export const useTeams = (params: GetTeamsQuery) =>
  useQuery({
    queryKey: ["teams", params.page, params.limit, params.search],
    queryFn: () => teamService.getAll(params),
    placeholderData: keepPreviousData,
  });

// =========================
// GET ONE
// =========================
export const useTeam = (id?: number) =>
  useQuery<Team>({
    queryKey: ["team", id],
    queryFn: () => teamService.getOne(id as number),
    enabled: !!id,
  });

// =========================
// CREATE
// =========================
export const useCreateTeam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTeamDto) =>
      teamService.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["teams"],
      });
    },
  });
};

// =========================
// UPDATE
// =========================
export const useUpdateTeam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: UpdateTeamDto;
    }) => teamService.update(id, data),

    onSuccess: (_, variables) => {
      // refresh list
      queryClient.invalidateQueries({
        queryKey: ["teams"],
      });

      // refresh detail
      queryClient.invalidateQueries({
        queryKey: ["team", variables.id],
      });
    },
  });
};

// =========================
// DELETE (OPTIMISÉ)
// =========================
export const useDeleteTeam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => teamService.delete(id),

    onSuccess: (_, id) => {
      // refresh list
      queryClient.invalidateQueries({
        queryKey: ["teams"],
      });

      // clean cache detail
      queryClient.removeQueries({
        queryKey: ["team", id],
      });
    },
  });
};

// =========================
// UPLOAD LOGO
// =========================
export const useUploadTeamLogo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      teamId,
      file,
    }: {
      teamId: number;
      file: File;
    }) => teamService.uploadLogo(teamId, file),

    onSuccess: (_, variables) => {
      // refresh list (logo visible in table)
      queryClient.invalidateQueries({
        queryKey: ["teams"],
      });

      // refresh detail
      queryClient.invalidateQueries({
        queryKey: ["team", variables.teamId],
      });
    },
  });
};