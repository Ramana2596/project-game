import api from '../../../core/interceptor/api-interceptor';

export function getValueStream(queryParams) {
    return api.get('/api/getValueStream',
        {
            params: { ...queryParams }
        });
}