import http from "../../shared/services/http-service"

export const positionService = {
  async getOpenPositions() {
    const response = await http.get('positions/open')

    return response.data
  },

  async getClosedPositions() {
    const response = await http.get('positions/closed')

    return response.data
  },
}
