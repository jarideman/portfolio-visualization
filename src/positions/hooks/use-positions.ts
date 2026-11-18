import { useQuery } from "@tanstack/react-query"
import { positionService } from "../services/position-service.http"
import type { Position, PositionStatus } from "../types"

export function usePositions(status: PositionStatus) {
  return useQuery<Position[]>({
    queryKey: [status, 'positions'],
    queryFn: async () => positionService.getPositions(status),
  })
}
