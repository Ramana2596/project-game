import api from "../../../core/interceptor/api-interceptor";

export function getDashboardData() {
  return api.get("/api/data");
}

export function getMarketFactorInfo(queryParams) {
  return api.get("/api/getMarketFactorInfo", {
    params: {
      ...queryParams,
    },
  });
}

export function getGameBatch(queryParams) {
  return api.get("/api/getStrategySetData", {
    params: {
      ...queryParams,
      type: "getGameBatch",
    },
  });
}
