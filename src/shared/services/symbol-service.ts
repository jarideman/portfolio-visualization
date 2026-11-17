import type { TimeFilter } from "../types"
import http from "./http-service"

export const symbolService = {
  async getSymbolData(symbol?: string, timeFilter?: TimeFilter) {
    const response = await http.get(`symbols/${symbol}`, {
      params: { filter: timeFilter }
    })

    return response.data
  },
}
