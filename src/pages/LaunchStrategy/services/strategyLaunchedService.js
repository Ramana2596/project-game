import api from '../../../core/interceptor/api-interceptor';

export function getGameId(queryParams) {
    return api.get('/api/getStrategyLaunch', { params: { ...queryParams, cmdLine: "launchData" } });
}

export function getStrategySetData(queryParams) {
    return api.get('/api/getStrategyLaunch', { params: { ...queryParams, cmdLine: "Launch_Strategy_Set" } });
}

export function getGameBatchData(queryParams) {
    return api.get('/api/getStrategyLaunch', { params: { ...queryParams, cmdLine: "Get_Batch" } });
}

export function getStrategySetNoDataApi(queryParams) {
    return api.get('/api/getStrategyLaunch', { params: { ...queryParams, cmdLine: "Get_Strategy" } });
}

export function updateStrategyLaunchData(queryParams) {
    return api.post('/api/updateStrategyLaunch', { ...queryParams, cmdLine: "Add_Strategy" });
}