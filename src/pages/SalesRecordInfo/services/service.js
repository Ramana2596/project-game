import api from '../../../core/interceptor/api-interceptor';

export function getSalesRecordInfo(queryParams) {
    return api.get('/api/getSalesInfo',
        {
            params: { ...queryParams }
        });
}