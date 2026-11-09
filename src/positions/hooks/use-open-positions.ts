import { useQuery } from "@tanstack/react-query"
import { positionService } from "../services/position-service.http"
import type { OpenPosition } from "../types"

export function useOpenPositions() {
  return useQuery<OpenPosition[]>({
    queryKey: ['open-positions'],
    queryFn: async () => positionService.getOpenPositions(),
  })
}
