import api from "../../../core/interceptor/api-interceptor";

// Get chart info with query params: gameId, gameBatch, gameTeam, cmdLine
export function getChartInfo(params) {
  return api.get("/api/getChartInfo", { params });
}
