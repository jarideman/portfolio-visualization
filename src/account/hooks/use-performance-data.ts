import { useQuery } from "@tanstack/react-query"
import { accountService } from "../services/account-service.http"
import type { TimeFilter } from "../../shared/types"

export function usePerformanceData(timeFilter: TimeFilter) {
  return useQuery({
    queryKey: ['account', 'performance-data', timeFilter],
    queryFn: async () => accountService.getPerformanceData(timeFilter),
  })
}
