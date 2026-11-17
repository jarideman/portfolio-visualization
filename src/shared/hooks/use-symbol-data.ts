import { useQuery } from "@tanstack/react-query"
import type { TimeFilter } from "../types"
import { symbolService } from "../services/symbol-service"

export function useSymbolData(symbol?: string, timeFilter?: TimeFilter) {
  return useQuery({
    queryKey: [symbol, timeFilter],
    queryFn: async () => symbolService.getSymbolData(symbol, timeFilter),
    enabled: Boolean(symbol),
  })
}
