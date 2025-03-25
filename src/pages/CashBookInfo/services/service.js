import api from '../../../core/interceptor/api-interceptor';

export function getCashBookInfo(queryParams) {
    return api.get('/api/getCashBookInfo',
        {
            params: { ...queryParams }
        });
}