import api from '../../../core/interceptor/api-interceptor';

export function getSalesRecordInfo(queryParams) {
    return api.get('/api/getAccountRecievableData',
        {
            params: { ...queryParams }
        });
}