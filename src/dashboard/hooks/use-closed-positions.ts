import { useQuery } from "@tanstack/react-query"
import { dashboardService } from "../services/dashboard-service.http"

export function useAllocations() {
  return useQuery({
    queryKey: ['dashboard-allocations'],
    queryFn: async () => dashboardService.getAllocations(),
  })
}
