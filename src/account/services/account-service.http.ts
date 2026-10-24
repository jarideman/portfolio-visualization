import http from "../../shared/services/http-service"

export const accountService = {
    async getAccountInfo() {
        const response = await http.get('account')
    
        return response.data
    },
}
