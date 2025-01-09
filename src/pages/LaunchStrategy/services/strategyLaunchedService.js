import api from '../../../core/interceptor/api-interceptor';

export function getDashboardData(userRole) {
    return api.get('/api/data');
};

export function getStrategySetData(queryParams) {
    return api.get('/api/getStrategySetData', {params: {...queryParams, type: "launchData"}});
}

export function getGameBatchData(queryParams) {
    return api.get('/api/getStrategySetData', {params: {...queryParams, type: "getGameBatch"}});
}

export function getStrategySetNoDataApi(queryParams) {
    return api.get('/api/getStrategySetData', {params: {...queryParams, type: "getStrategySet"}});
}