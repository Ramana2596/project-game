import api from '../../../core/interceptor/api-interceptor';

// export function getMarketFactorAllInfo(queryParams) {
//     return api.get('/api/getMarketFactorAllInfo',
//         {
//             params: { ...queryParams }
//         });
// }

export function getMarketFactorAllInfo(queryParams) {
  return api.get("/api/getMarketFactorAllInfo", {
    params: {
      ...queryParams,
      cmdLine: 'Market_Factor'
    },
  });
}

export function getGameBatch(queryParams) {
  return api.get("/api/getMarketFactorAllInfo", {
    params: {
      ...queryParams,
      cmdLine: "Get_Batch",
    },
  });
}