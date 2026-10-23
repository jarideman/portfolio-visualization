import { useQuery } from "@tanstack/react-query"
import { positionService } from "../position-service.http"
  
export function useClosedPositions() {
  return useQuery({
    queryKey: ['closed-positions'],
    queryFn: async () => positionService.getClosedPositions(),
  })
}
