import { useQuery } from "@tanstack/react-query"
import { positionService } from "../services/position-service.http"
import type { ClosedPosition } from "../types"

export function useClosedPositions() {
  return useQuery<ClosedPosition[]>({
    queryKey: ['closed-positions'],
    queryFn: async () => positionService.getClosedPositions(),
  })
}
