import api from "../../../core/interceptor/api-interceptor";

export function getMarketInfo(queryParams) {
  return api.get("/api/getMarketFactorInfo", {
    params: {
      ...queryParams,
      cmdLine: 'Market_Factor'
    },
  });
}

export function getBatch(queryParams) {
  return api.get("/api/getMarketFactorInfo", {
    params: {
      ...queryParams,
      cmdLine: "Get_Batch",
    },
  });
}
