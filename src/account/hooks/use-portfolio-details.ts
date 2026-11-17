import { useQuery } from "@tanstack/react-query"
import { accountService } from "../services/account-service.http"
import type { ValueItem } from "../../shared/types"

export function usePortfolioDetails() {
  return useQuery<ValueItem[]>({
    queryKey: ['account', 'portfolio-details'],
    queryFn: async () => accountService.getPortfolioDetails(),
  })
}
