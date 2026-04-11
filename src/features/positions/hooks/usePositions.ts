import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { positionService } from "../services/positions-services";
import {
  CreatePositionDto,
  UpdatePositionDto,
  Position,
  GetPositionsParams,
} from "../types/positions-types";

// -----------------------------
// GET /position/all
// -----------------------------
export const usePositions = (params?: GetPositionsParams) =>
  useQuery({
    queryKey: ["positions", params?.page, params?.limit, params?.search],
    queryFn: () => positionService.getAll(params),
    placeholderData: keepPreviousData,
  });

// -----------------------------
// GET /position/:id
// -----------------------------
export const usePosition = (id: number) =>
  useQuery<Position>({
    queryKey: ["position", id],
    queryFn: () => positionService.getOne(id),
    enabled: !!id,
  });

// -----------------------------
// POST /position
// -----------------------------
export const useCreatePosition = () => {
  const queryClient = useQueryClient();

  return useMutation<Position, unknown, CreatePositionDto>({
    mutationFn: positionService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["positions"] });
    },
  });
};

// =============================
// PATCH /position/:id
// =============================
export const useUpdatePosition = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Position,
    unknown,
    { id: number; data: UpdatePositionDto }
  >({
    mutationFn: ({ id, data }) => positionService.update(id, data),

    onSuccess: (_, variables) => {
      // refresh LIST
      queryClient.invalidateQueries({
        queryKey: ["positions"],
      });

      // refresh ONLY affected item (best practice)
      queryClient.invalidateQueries({
        queryKey: ["position", variables.id],
      });
    },
  });
};

// =============================
// DELETE /position/:id
// =============================
export const useDeletePosition = () => {
  const queryClient = useQueryClient();

  return useMutation<{ id: number }, unknown, number>({
    mutationFn: positionService.delete,

    onSuccess: (_, id) => {
      // refresh LIST
      queryClient.invalidateQueries({
        queryKey: ["positions"],
      });

      // remove cached detail instantly (UX pro)
      queryClient.removeQueries({
        queryKey: ["position", id],
      });
    },
  });
};
