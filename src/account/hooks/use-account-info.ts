import { useQuery } from "@tanstack/react-query"
import { accountService } from "../services/account-service.http"

export function useAccountInfo() {
  return useQuery({
    staleTime: 60,
    queryKey: ['account', 'info'],
    queryFn: async () => accountService.getAccountInfo(),
  })
}
