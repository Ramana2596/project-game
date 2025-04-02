import api from '../../../core/interceptor/api-interceptor';

export function getStrategyPlanInfo(queryParams) {
    return api.get('/api/getStrategyPlanInfo',
        {
            params: { ...queryParams }
        });
}
export function getGameBatch(queryParams) {
  return api.get("/api/getMarketFactorInfo", {
    params: {
      ...queryParams,
      cmdLine: "Get_Batch",
    },
  });
}