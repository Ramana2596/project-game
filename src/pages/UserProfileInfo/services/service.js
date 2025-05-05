import api from '../../../core/interceptor/api-interceptor';

export function getUserProfileInfo(queryParams) {
    return api.get('/api/getUserProfileInfo',
        {
            params: { ...queryParams }
        });
}