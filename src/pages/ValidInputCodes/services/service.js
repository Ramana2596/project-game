import api from '../../../core/interceptor/api-interceptor';

export function getValidInputCodes(queryParams) {
    return api.get('/api/getValidInputCodes',
        {
            params: { ...queryParams }
        });
}