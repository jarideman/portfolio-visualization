import { useQuery } from "@tanstack/react-query"
import { accountService } from "../services/account-service.http"

export function useRiskDetails() {
  return useQuery({
    queryKey: ['account', 'risk-details'],
    queryFn: async () => accountService.getRiskDetails(),
  })
}
