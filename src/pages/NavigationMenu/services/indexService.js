import api from '../../../core/interceptor/api-interceptor';

export function getUserAccessPageIds(userRole) {
    return api.get('/api/getUserAccessPageIds',
        {
            params: { userRole }
        });
}

export function enrollUser(payload) {
    return api.post('/api/enrollUser', payload);
}
