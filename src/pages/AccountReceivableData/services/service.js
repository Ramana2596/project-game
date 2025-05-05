import api from '../../../core/interceptor/api-interceptor';

export function getAccountReceivableData(queryParams) {
    return api.get('/api/getAccountReceivableData',
        {
            params: { ...queryParams }
        });
}