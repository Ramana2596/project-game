import api from '../../../core/interceptor/api-interceptor';

export function getStdOperationInput(queryParams) {
    return api.get('/api/getStdOperationInput',
        {
            params: { ...queryParams }
        });
}