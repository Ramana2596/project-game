import api from '../../../core/interceptor/api-interceptor';

export function getSalesRecordInfo(queryParams) {
    return api.post('/api/getSalesInfo',
        {
            params: { ...queryParams }
        });
}