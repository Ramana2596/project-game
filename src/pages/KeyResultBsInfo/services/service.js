import api from '../../../core/interceptor/api-interceptor';

export function getKeyResultBsInfo(queryParams) {
    return api.post('/api/getKeyResultBsInfo',
        {
            params: { ...queryParams }
        });
}
