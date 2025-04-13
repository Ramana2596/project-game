import api from '../../../core/interceptor/api-interceptor';

    export function getAccountPayable(queryParams) {
    return api.get('/api/getAccountPayableData',
        {
            params: { ...queryParams }
        });
}
