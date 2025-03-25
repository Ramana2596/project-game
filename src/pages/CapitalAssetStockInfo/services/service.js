import api from '../../../core/interceptor/api-interceptor';

export function getCapitalAssetStockInfo(queryParams) {
    return api.get('/api/getCapitalAssetStockInfo',
        {
            params: { ...queryParams }
        });
}