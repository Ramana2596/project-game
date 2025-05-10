import api from '../../../core/interceptor/api-interceptor';

export function getOperationInputError(queryParams) {
    return api.get('/api/getOperationInputError',
        {
            params: { ...queryParams }
        });
}