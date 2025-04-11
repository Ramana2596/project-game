import api from '../../../core/interceptor/api-interceptor';

export function getValueStreamMap(queryParams) {
    return api.get('/api/getValueStreamMap',
        {
            params: { ...queryParams }
        });
}