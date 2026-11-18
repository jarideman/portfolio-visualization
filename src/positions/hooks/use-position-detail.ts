import { useQuery } from "@tanstack/react-query"
import { positionService } from "../services/position-service.http"
import type { Position, PositionStatus } from "../types"

export function usePositionDetail(status: PositionStatus, ticket: number) {
  return useQuery<Position>({
    queryKey: [status, 'position', ticket],
    queryFn: async () => positionService.getPosition(status, ticket),
    enabled: Boolean(status) && Boolean(ticket),
  })
}
