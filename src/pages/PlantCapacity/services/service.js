import api from '../../../core/interceptor/api-interceptor';

export function getPlantCapacity(queryParams) {
    return api.get('/api/getPlantCapacity',
        {
            params: { ...queryParams }
        });
}