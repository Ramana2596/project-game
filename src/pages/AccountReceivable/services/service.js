import api from '../../../core/interceptor/api-interceptor';

export function getAccountReceivable(queryParams) {
    return api.get('/api/getAccountReceivable',
        {
            params: { ...queryParams }
        });
}