import { useQuery } from "@tanstack/react-query"
import { accountService } from "../services/account-service.http"

export function usePerformanceData() {
  return useQuery({
    queryKey: ['account', 'performance-data'],
    queryFn: async () => accountService.getPerformanceData(),
  })
}
