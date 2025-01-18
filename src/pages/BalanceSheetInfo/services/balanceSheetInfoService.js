import api from '../../../core/interceptor/api-interceptor';

export function getBalanceSheetInfo(queryParams) {
    return api.get('/api/getBalanceSheetInfo',
        {params: { ...queryParams }
    });
}