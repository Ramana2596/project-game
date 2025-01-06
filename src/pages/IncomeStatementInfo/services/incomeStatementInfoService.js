import api from '../../../core/interceptor/api-interceptor';

export function getIncomeStatementInfo(queryParams) {
    return api.get('/api/getIncomeStatementInfo',
        {params: { ...queryParams }
    });
}