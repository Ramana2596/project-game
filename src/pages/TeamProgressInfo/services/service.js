/*
import api from '../../../core/interceptor/api-interceptor';

export function getTeamProgressInfo(queryParams) {
    return api.get('/api/getTeamProgressInfo',
        {
            params: { ...queryParams }
        });
}
*/

import api from "../../../core/interceptor/api-interceptor";

export function getTeamProgressInfo(queryParams) {
  return api.get("/api/getTeamProgressInfo", {
    params: {
      ...queryParams,
      cmdLine: 'Team_Progress'
    },
  });
}

export function getGameBatch(queryParams) {
  return api.get("/api/getTeamProgressInfo", {
    params: {
      ...queryParams,
      cmdLine: "Get_Batch",
    },
  });
}