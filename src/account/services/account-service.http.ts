import http from "../../shared/services/http-service"

export const accountService = {
  async getAccountInfo() {
    const response = await http.get('account/info')

    return response.data
  },

  async getAllocations() {
    const response = await http.get('account/allocations')

    return response.data
  },

  async getPortfolioDetails() {
    const response = await http.get('account/portfolio')

    return response.data
  },

  async getRiskDetails() {
    const response = await http.get('account/risk')

    return response.data
  },

  async getPerformanceData() {
    const response = await http.get('account/performance')

    return response.data
  },
}
