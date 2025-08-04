import api from '../../../core/interceptor/api-interceptor';

export function getAssetCatalogTeam(queryParams) {
    return api.get('/api/getAssetCatalogTeam',
        {
            params: { ...queryParams }
        });
}