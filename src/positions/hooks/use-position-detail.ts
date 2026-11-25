import { useQuery } from "@tanstack/react-query"
import { positionService } from "../services/position-service.http"
import type { Position, PositionStatus } from "../types"

export function usePositionDetail(status: PositionStatus, id: number) {
  return useQuery<Position>({
    queryKey: [status, 'position', id],
    queryFn: async () => positionService.getPosition(status, id),
    enabled: Boolean(status) && Boolean(id),
  })
}
