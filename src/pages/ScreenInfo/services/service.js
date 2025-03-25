import api from '../../../core/interceptor/api-interceptor';

export function getScreenInfo(queryParams) {
    return api.get('/api/getScreenInfo',
        {
            params: { ...queryParams }
        });
}