import api from '../../../core/interceptor/api-interceptor';

export function getReleaseMarketInput(queryParams) {
    return api.get('/api/getReleaseMarketInput',
        {
            params: { ...queryParams }
        });
}