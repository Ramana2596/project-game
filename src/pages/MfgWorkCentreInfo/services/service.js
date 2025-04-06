import api from '../../../core/interceptor/api-interceptor';

export function getMfgWorkCentreInfo(queryParams) {
    return api.get('/api/getMfgWorkCentreInfo',
        {
            params: { ...queryParams }
        });
}