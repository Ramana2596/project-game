import api from '../../../core/interceptor/api-interceptor';

export function getKeyResultPlInfo(queryParams) {
    return api.post('/api/getKeyResultPlInfo',
        {
            params: { ...queryParams }
        });
}