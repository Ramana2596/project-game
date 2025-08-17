import api from '../../../core/interceptor/api-interceptor';

export function getAssetCatalog(queryParams) {
    return api.get('/api/getAssetCatalog',
        {
            params: { ...queryParams }
        });
}

