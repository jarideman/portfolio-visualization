import http from "../shared/http-service"

export const positionService = {
    async getOpenPositions() {
        const response = await http.get('positions/open')
    
        return response
    },

    async getClosedPositions() {
        const response = await http.get('positions/closed')
    
        return response
    },
}