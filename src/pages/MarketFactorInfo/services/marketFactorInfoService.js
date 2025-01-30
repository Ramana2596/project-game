import api from "../../../core/interceptor/api-interceptor";

export function getMarketFactorInfo(queryParams) {
  return api.get("/api/getMarketFactorInfo", {
    params: {
      ...queryParams,
      cmdLine: 'Market_Factor'
    },
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
