import { useQuery } from "@tanstack/react-query"
import { accountService } from "../services/account-service.http"

export function useAllocations() {
  return useQuery({
    queryKey: ['account', 'allocations'],
    queryFn: async () => accountService.getAllocations(),
  })
}
