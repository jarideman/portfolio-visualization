import http from "../../shared/services/http-service"

export const dashboardService = {
  async getAllocations() {
    const response = await http.get('dashboard/allocations')

    return response.data
  },
}
