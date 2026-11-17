import { useQuery } from "@tanstack/react-query"
import { positionService } from "../services/position-service.http"
import type { Position, PositionType } from "../types"

export function usePositionDetail(type: PositionType, ticket: number) {
  return useQuery<Position>({
    queryKey: [type, 'position', ticket],
    queryFn: async () => positionService.getPosition(type, ticket),
    enabled: Boolean(type) && Boolean(ticket),
  })
}
