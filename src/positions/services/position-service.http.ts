import http from "../../shared/services/http-service"
import type { PositionType } from "../types"

export const positionService = {
  async getPositions(type: PositionType) {
    const response = await http.get(`positions/${type}`)

    return response.data
  },
}
