import { useQuery } from "@tanstack/react-query"
import { positionService } from "../position-service.http"
  
export function useOpenPositions() {
  return useQuery({
    queryKey: ['open-positions'],
    queryFn: async () => positionService.getOpenPositions(),
  })
}
