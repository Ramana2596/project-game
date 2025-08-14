

import api from "../../../core/interceptor/api-interceptor";

export function getStdMarketInput(queryParams) {
  return api.get("/api/getStdMarketInput", {
    params: {
      ...queryParams,
      cmdLine: 'Market_Input'
    },
  });
}


export function getGameBatch(queryParams) {
  return api.get("/api/getStdMarketInput", {
    params: {
      ...queryParams,
      cmdLine: "Get_Batch",
    },
  })
}
