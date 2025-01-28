import api from '../../../core/interceptor/api-interceptor';

export function getSalesRecordInfo(queryParams) {
    return api.get('/api/getSalesRecordInfo',
        {
            params: { ...queryParams }
        });
}