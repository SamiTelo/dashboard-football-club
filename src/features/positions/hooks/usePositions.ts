import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";

import { positionService } from "../services/positions.service";
import {
  CreatePositionDto,
  UpdatePositionDto,
  Position,
  GetPositionsParams,
} from "../types/positions-types";
import { useAuth } from "@/features/auth/hooks/useAuth";

// =========================
// GET ALL
// =========================
export const usePositions = (params?: GetPositionsParams) => {
  const { user, loading: authLoading } = useAuth(true);

  return useQuery({
    queryKey: [
      "positions",
      user?.id,
      params?.page,
      params?.limit,
      params?.search,
    ],
    queryFn: () => positionService.getAll(params),
    placeholderData: keepPreviousData,
    enabled: !!user?.id && !authLoading,
  });
};

// =========================
// GET ONE
// =========================
export const usePosition = (id?: number) =>
  useQuery<Position>({
    queryKey: ["position", id],
    queryFn: () => positionService.getOne(id as number),
    enabled: !!id,
  });

// =========================
// CREATE
// =========================
export const useCreatePosition = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePositionDto) =>
      positionService.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["positions"],
        exact: false,
      });
    },
  });
};

// =========================
// UPDATE
// =========================
export const useUpdatePosition = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: UpdatePositionDto;
    }) => positionService.update(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["positions"],
        exact: false,
      });

      queryClient.invalidateQueries({
        queryKey: ["position", variables.id],
        exact: false,
      });
    },
  });
};

// =========================
// DELETE
// =========================
export const useDeletePosition = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => positionService.delete(id),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["positions"],
        exact: false,
      });

      queryClient.removeQueries({
        queryKey: ["position", id],
        exact: false,
      });
    },
  });
};