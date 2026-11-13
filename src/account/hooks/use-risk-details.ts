import { useQuery } from "@tanstack/react-query"
import { accountService } from "../services/account-service.http"
import type { ValueItem } from "../../shared/types"

export function useRiskDetails() {
  return useQuery<ValueItem[]>({
    queryKey: ['account', 'risk-details'],
    queryFn: async () => accountService.getRiskDetails(),
  })
}
