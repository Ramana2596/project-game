import api from '../../../core/interceptor/api-interceptor';

export function getUserRoles(queryParams) {
    return api.get('/api/getUserRoles',
        {
            params: { ...queryParams }
        });
}