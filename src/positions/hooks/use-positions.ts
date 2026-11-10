import { useQuery } from "@tanstack/react-query"
import { positionService } from "../services/position-service.http"
import type { Position, PositionType } from "../types"

export function usePositions(type: PositionType) {
  return useQuery<Position[]>({
    queryKey: [type, 'positions'],
    queryFn: async () => positionService.getPositions(type),
  })
}
