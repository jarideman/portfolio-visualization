import { useQuery } from "@tanstack/react-query"
import { accountService } from "../services/account-service.http"

export function usePortfolioDetails() {
  return useQuery({
    queryKey: ['account', 'portfolio-details'],
    queryFn: async () => accountService.getPortfolioDetails(),
  })
}
