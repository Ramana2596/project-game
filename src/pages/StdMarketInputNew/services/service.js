import api from "../../../core/interceptor/api-interceptor";

export function getStdMarketInputNew(queryParams) {
  return api.get("/api/getStdMarketInputNew", {
    params: {
      ...queryParams,
      cmdLine: 'Market_Input'
    },
  });
}

export function getGameBatch(queryParams) {
  return api.get("/api/getStdMarketInputNew", {
    params: {
      ...queryParams,
      cmdLine: "Get_Batch",
    },
  });
}
