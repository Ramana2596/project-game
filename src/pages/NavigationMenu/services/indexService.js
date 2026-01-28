import api from '../../../core/interceptor/api-interceptor';
/*
export function getUserAccessPageIds(userRole) {
    return api.get('/api/getUserAccessPageIds',
        {
            params: { userRole }
        });
}
*/

// Pass gameId and userId instead of just userRole 
export function getUserAccessPageIds(gameId, userId) {
    return api.get('/api/getUserAccessPageIds',
        {
            params: { gameId, userId }
        });
}
export function enrollUser(payload) {
    return api.post('/api/enrollUser', payload);
}
