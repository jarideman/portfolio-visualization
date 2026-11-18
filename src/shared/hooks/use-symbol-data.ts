import { useQuery } from "@tanstack/react-query"
import { type Candle, type TimeFilter } from "../types"
import { symbolService } from "../services/symbol-service"

export function useSymbolData(symbol?: string, timeFilter?: TimeFilter) {
  return useQuery<Candle[]>({
    staleTime: 60 * 1000,
    queryKey: [symbol, timeFilter],
    queryFn: async () => symbolService.getSymbolData(symbol, timeFilter),
    enabled: Boolean(symbol),
  })
}
