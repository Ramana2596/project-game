// services.js
import api from "../../../core/interceptor/api-interceptor";

export function getMarketData(queryParams) {
  return api.post("/api/publishMarketData", {
    ...queryParams,
    cmdLine: 'Market_Input'
  });
}

export function getBatch(queryParams) {
    return api.post("/api/publishMarketData", {
      ...queryParams,
      cmdLine: 'Get_Batch',
    });
  }