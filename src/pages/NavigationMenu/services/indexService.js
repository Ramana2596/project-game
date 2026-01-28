import api from '../../../core/interceptor/api-interceptor';

// Pass gameId and rlId instead of userRole 
export function getUserAccessPageIds(gameId, rlId) {
    return api.get('/api/getUserAccessPageIds',
        {
            params: { gameId, rlId }
        });
}
export function enrollUser(payload) {
    return api.post('/api/enrollUser', payload);
}
