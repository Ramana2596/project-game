import api from '../../../core/interceptor/api-interceptor';

export function getStdMarketInput(queryParams) {
    return api.get('/api/getStdMarketInput',
        {
            params: { ...queryParams }
        });
}