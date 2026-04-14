import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { CreateTeamDto, GetTeamsQuery, Team, UpdateTeamDto } from "../types/teams-types";
import { teamService } from "../services/teams-services";
import { useAuth } from "@/features/auth/hooks/useAuth";


// =========================
// GET ALL
// =========================
export const useTeams = (params: GetTeamsQuery) => {
  const { user, loading: authLoading } = useAuth(true);

  return useQuery({
    queryKey: ["teams", user?.id, params.page, params.limit, params.search],
    queryFn: () => teamService.getAll(params),
    placeholderData: keepPreviousData,
    enabled: !!user?.id && !authLoading
  });
};

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
        exact: false,
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
        exact: false,
      });

      // refresh detail
      queryClient.invalidateQueries({
        queryKey: ["team", variables.id],
        exact: false,
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
        exact: false,
      });

      // clean cache detail
      queryClient.removeQueries({
        queryKey: ["team", id],
        exact: false,
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
        exact: false,
      });

      // refresh detail
      queryClient.invalidateQueries({
        queryKey: ["team", variables.teamId],
        exact: false,
      });
    },
  });
};