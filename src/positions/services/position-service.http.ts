import http from "../../shared/services/http-service"
import type { PositionStatus } from "../types"

export const positionService = {
  async getPositions(status: PositionStatus) {
    const response = await http.get(`positions/${status}`)

    return response.data
  },

  async getPosition(status: PositionStatus, id: number) {
    const response = await http.get(`positions/${status}/${id}`)

    return response.data
  },
}
